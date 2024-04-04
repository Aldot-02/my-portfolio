import express, { Router } from 'express';
import { AuthenticatedUser, Logout, loginUser, registerUser } from '../Controllers/AuthController';

const router: Router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/authenticated', AuthenticatedUser);
router.post('/logout', Logout);

export default router;