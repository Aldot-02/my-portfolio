import mongoose, { Document, Schema, Model } from "mongoose";

export interface Project extends Document {
    title: string;
    description: string;
    firstTechnology: string;
    secondTechnology: string;
    thirdTechnology: string;
    deployedUrl: string;
}

const ProjectsSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    firstTechnology: {
        type: String,
        required: true
    },
    secondTechnology: {
        type: String,
    },
    thirdTechnology: {
        type: String,
    },
    deployedUrl: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const ProjectsModel: Model<Project> = mongoose.model<Project>("Projects", ProjectsSchema);
export default ProjectsModel;