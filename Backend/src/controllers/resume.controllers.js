import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Resume} from "../models/resume.models.js";

const createResume= asyncHandler( async(req,res)=>{
    const {title, themeColor}= req.body;
    if(!title || !themeColor){
        throw new ApiError(400,"Title and themeColor are required");
    }

    const resume= await Resume.create({
        title,
        themeColor,
        user: req.user._id,
        firstName: "",
        lastName: "",
        email: "",
        summary: "",
        jobTitle: "",
        phone: "",
        address: "",
        experience: [],
        education: [],
        skills: [],
        projects: []
    });

    return res.status(201)
              .json(new ApiResponse(201,{resume},"Resume created successfully"));
});

const updateResume= asyncHandler( async(req,res)=>{
    const {id}= req.params;
    if(!id){
        throw new ApiError(400,"Resume not found");
    }

    const updatedResume= await Resume.findOneAndUpdate(
        {
            _id: id,
            user: req.user._id
        },
        {
            $set: req.body,
            $currentDate: {updatedAt: true}
        },
        {
            new: true,
            runValidators: true
        }
    );
    if(!updatedResume){
        throw new ApiError(404,"Resume not found");
    }
    return res.status(200)
              .json(new ApiResponse(200,updatedResume,"Resume updated successfully"));
});

const deleteResume= asyncHandler( async(req,res)=>{
    const {id}= req.params;
    if(!id){
        throw new ApiError(400,"Resume not found");
    }

    const resume= await Resume.findOneAndDelete({
        _id: id,
        user: req.user._id 
    });
    if(!resume){
        throw new ApiError(404,"Resume not found or exist");
    }

    return res.status(200)
            .json(new ApiResponse(200,{},"Resume deleted successfully"));
});

const getResume= asyncHandler( async(req,res)=>{
    const {id}= req.params;
    if(!id){
        throw new ApiError(400,"Resume not found");
    }

    const resume= await Resume.findOne({
        _id: id,
        user: req.user._id
    })
    if(!resume){
        throw new ApiError(404,"Resume not found or exist");
    }

    return res.status(200)
            .json(new ApiResponse(200,resume,"Resume fetched successfully"));
});

const getAllResume= asyncHandler( async(req,res)=>{
    const resumes= await Resume.find({
        user: req.user._id 
    }).sort({createdAt:-1});

    return res.status(200)
              .json(new ApiResponse(200,resumes,"All resumes fetched successfully"));
});

export{
    createResume,
    updateResume,
    deleteResume,
    getResume,
    getAllResume,
};
