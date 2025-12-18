import mongoose from "mongoose";

const experienceSchema= new mongoose.Schema({
    tile:{
        type: String
    },
    companyName:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    startDate:{
        type: String
    },
    endDate:{
        type: String
    },
    currentlyWorking:{
        type: Boolean
    },
    workSummary:{
        type: String
    }
},{_id:false});

export default experienceSchema;
