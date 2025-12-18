import mongoose from "mongoose";
import experienceSchema from "./experience.models.js";
import educationSchema from "./education.models.js";
import skillSchema from "./skill.models.js";
import projectSchema from "./project.models.js";

const resumeSchema= new mongoose.Schema({
    firstName:{
        type: String,
        default: ""
    },
    lastName:{
        type: String,
        default: ""
    },
    email:{
        type: String,
        default: ""
    },
    title:{
        type: String,
        required: true 
    },
    summary:{
        type: String,
        default: ""
    },
    jobTitle:{
        type: String,
        default: ""
    },
    phone:{
        type: String,
        default: ""
    },
    address:{
        type: String,
        default: ""
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    experience:[{
        type: experienceSchema
    }],
    education:[{
        type: educationSchema
    }],
    skills:[{
        type: skillSchema
    }],
    projects:[{
        type: projectSchema
    }],
    themeColor:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now 
    },
    updatedAt:{
        type: Date,
        default: Date.now 
    }
});

export const Resume= mongoose.model("Resume",resumeSchema);
