import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true 
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password= await bcrypt.hash(this.password,10);
});

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.JWT_SECRET_KEY, 
        {expiresIn: process.env.JWT_SECRET_EXPIRES_IN}
    );
};

export const User= mongoose.model("User",userSchema);
