import { Router } from "express";

export const userRouter =  Router();

userRouter.post('/register', userController.registerUser);
