import express from "express";
import {register,login} from "../controllers/user.controller.js"

const userRoute= express.Router();
userRoute.route("/register").post(register);
userRoute.route("/login").post(login);

export default userRoute;