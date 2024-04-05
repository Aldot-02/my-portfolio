import express, { Router } from 'express';
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from '../Controllers/ProjectsController';

const router: Router = express.Router();


router.post('/', createProject);
router.get('/all', getAllProjects);
router.get('/:id', getProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;