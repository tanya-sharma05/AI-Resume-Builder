import {connectDB} from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import {app} from "./app.js";

connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8001, console.log(`App is listening on port ${process.env.PORT}`));
    })
    .catch((err)=>{
        console.log("Error occured", err);
    });
