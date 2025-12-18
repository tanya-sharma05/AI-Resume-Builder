import mongoose from "mongoose";

const skillSchema= new mongoose.Schema({
    name:{
        type: String 
    },
    rating:{
        type: Number
    }
},{_id:false});

export default skillSchema;
