import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

export const userRouter =  Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
