import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { Request, Response } from 'express';

// IMPORTING ROUTES
import AuthRoute from '../Routes/AuthRoute';
import userRoute from '../Routes/UserRoute';
import ProjectsRoute from '../Routes/ProjectsRoute';

export const app: Application = express();

// MIDDLEWARES
app.use(cors({
    credentials: true,
    origin: ['https://my-brand-backend-aldo-1.onrender.com', 'http://localhost:3000', 'https://aldot.netlify.app']
}));
app.use(bodyParser.json({ limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

dotenv.config();

app.use('/auth', AuthRoute);
app.use('/user', userRoute);
app.use('/project', ProjectsRoute);
app.get("/", (req: Request, res: Response) => {
    res.send("Consider using the above link for getting my APIs");
});