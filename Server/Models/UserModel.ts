import mongoose, { Document, Model } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});

const UserModel: Model<User> = mongoose.model<User>("Admins", userSchema);
export default UserModel;