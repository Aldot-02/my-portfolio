import express, { Router } from 'express';
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from '../Controllers/ProjectsController';
import { isAuthenticated } from '../Middlewares/middlewares';

const router: Router = express.Router();


router.post('/', createProject);
router.get('/all', getAllProjects);
router.get('/:id', getProject);
router.patch('/:id', isAuthenticated, updateProject);
router.delete('/:id', isAuthenticated, deleteProject);

export default router;