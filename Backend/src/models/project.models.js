import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    projectName:{
        type: String 
    },
    techStack:{
        type: [String]
    },
    projectSummary:{
        type: String 
    }
},{_id:false});

export default projectSchema;
