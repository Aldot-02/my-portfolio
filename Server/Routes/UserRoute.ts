import express, { Router } from 'express'
import { deleteUser, getAllUsers, getProfile, updateUser, getUser } from '../Controllers/UserController';
import { isAuthenticated } from '../Middlewares/middlewares';

const router: Router = express.Router();

router.get('/profile', isAuthenticated, getProfile);
router.get('/', isAuthenticated, getAllUsers);
router.get('/:id', isAuthenticated, getUser);
router.patch('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;