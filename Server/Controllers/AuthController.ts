import { Request, Response } from 'express';
import UserModel, { User } from "../Models/UserModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const { sign, verify } = jwt;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password }: User = req.body;

    if (!name) {
        res.status(400).json({ message: "Name is required" });
        return;
    } else if (!email){
        res.status(400).json({ message: "Email is required" });
        return;
    } else if (!password){
        res.status(400).json({ message: "Password is required" });
        return;
    }

    try {
        const existingUser = await UserModel.findOne({ email });
    
        if (existingUser) {
            res.status(409).json({ message: 'Account already exists with this email.' });
            return;
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
    
        await newUser.save();
    
        res.status(200).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: { email: string, password: string } = req.body;

    if (!email){
        res.status(400).json({ message: "Email is required" });
        return;
    }else if (!password){
        res.status(400).json({ message: "Password is required" });
        return;
    }

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if(!validity) {
                res.status(400).json({message: "Wrong Credentials"});
                return;
            }

            // ACCESS TOKEN
            const accessToken = sign({id:user._id}, "access_secret", {expiresIn: '5m'});

            res.cookie("access", accessToken, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: 'none',
                secure: true,
                httpOnly: true
            });

            res.status(200).json({ accessToken });
            return;
        }
        else {
            res.status(404).json({message: "User not found"});
            return;
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
};


// Getting Authenticated User
export const AuthenticatedUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const accessToken = req.cookies['access'];
        
        if (!accessToken) {
            res.status(401).send({
                message: 'unauthenticated'
            });
            return;
        }

        const payload: any = verify(accessToken, "access_secret");

        if (!payload) {
            res.status(401).send({
                message: 'unauthenticated'
            });
            return;
        }

        const user = await UserModel.findOne({ _id: payload.id });

        if (!user) {
            res.status(401).send({
                message: 'unauthenticated'
            });
            return;
        }
        

        res.status(200).json(user);
    } catch (e) {
        res.status(401).send({
            message: 'unauthenticated'
        });
        return;
    }
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
    res.cookie('access', '', {maxAge: -1});

    res.status(200).json({message: "Logout was successful"});
}