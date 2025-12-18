import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";

const registerUser= asyncHandler( async(req,res)=>{
    const {fullName, email, password}= req.body;
    if(!fullName || !email || !password){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser= await User.findOne({email});
    if(existedUser){
        throw new ApiError(409,"User already registered");
    }

    const user= await User.create({
        fullName,
        email,
        password
    });

    const createdUser= await User.findById(user._id).select("-password");
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
});

const loginUser= asyncHandler( async(req,res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        throw new ApiError(400,"All fields are required");
    }

    const user= await User.findOne({email});
    if(!user){
        throw new ApiError(404,"User does not exists");
    }

    const isPasswordValid= await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials");
    }

    const token= user.generateToken();
    const options={
        httpOnly: true,
        secure: true
    };

    return res.status(200)
              .cookie("token",token,options)
              .json(new ApiResponse(200,{user:{id: user._id, email: user.email, fullName: user.fullName}},"User logged in successfully"));
});

const logoutUser= asyncHandler( async(req,res)=>{
    return res.status(200)
              .clearCookie("token")
              .json(new ApiResponse(200,{},"Logged out successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser
};
