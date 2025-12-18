import express from "express";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app= express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api/v2/users",userRouter);
app.use("/api/v2/resume",resumeRouter);

export {app};
