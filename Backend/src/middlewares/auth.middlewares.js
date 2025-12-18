import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export const verifyJWT= asyncHandler( async(req,res,next)=>{
    const token= req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        throw new ApiError(401,"Unauthorized access");
    }

    const decodedToken= jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId= decodedToken._id || decodedToken.id;
    const user= await User.findById(userId).select("-password");
    if(!user){
        throw new ApiError(401,"Invalid access token");
    }

    req.user= user;
    next();
});
