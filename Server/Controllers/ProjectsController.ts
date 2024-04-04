import ProjectsModel, { Project } from "../Models/ProjectsModel";
import { Request, Response } from "express";

// CREATING A PROJECT
export const createProject = async (req: Request, res: Response): Promise<void> => {
    const newProject = new ProjectsModel(req.body);

    try {
        await newProject.save();
        res.status(200).json(newProject);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


//get a Project
export const getProject = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const project = await ProjectsModel.findById(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


// get All Projects
export const getAllProjects = async (req: Request, res: Response) : Promise<void> => {
    try {
        const projects: Project[] = await ProjectsModel.find()
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

// Update a Project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    const projectId = req.params.id;

    try {
        const project = await ProjectsModel.findById(projectId);
        if(project) {
            await project.updateOne({ $set: req.body });
            res.status(200).json(project);

        }
        else {
            res.status(404).json({message: "Project Not found"});
        }
    } catch (error: any) {
        res.status(500).json({message: error});
    }
};

// Delete a Project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const project = await ProjectsModel.findById(id);
        if (project) {
            await project.deleteOne();
            res.status(200).json({message: "Project Successfully deleted"});
        } else {
            res.status(404).json({message: "Project Not Found"});
        }
    } catch (error: any) {
        res.status(500).json({message: error});
    }
}