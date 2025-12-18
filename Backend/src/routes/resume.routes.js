import {Router} from "express";
import {createResume, deleteResume, getAllResume, getResume, updateResume} from "../controllers/resume.controllers.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js"; 

const router= Router();
router.route("/create").post(verifyJWT,createResume);
router.route("/update/:id").put(verifyJWT,updateResume);
router.route("/get/:id").get(verifyJWT,getResume);
router.route("/get").get(verifyJWT,getAllResume);
router.route("/delete/:id").delete(verifyJWT,deleteResume);

export default router;
