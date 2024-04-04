import mongoose, { Document, Schema, Model } from "mongoose";

export interface Project extends Document {
    title: string;
    description: string;
    coverImage: string;
    firstTechnology: string;
    secondTechnology: string;
    thirdTechnology: string;
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
        required: true
    },
    thirdTechnology: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const ProjectsModel: Model<Project> = mongoose.model<Project>("Projects", ProjectsSchema);
export default ProjectsModel;