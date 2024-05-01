import { Router } from "express";
import { UserController } from "../controller/User.controller.js";

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/get', userController.getUser);
userRouter.delete('/delete/:id', userController.deleteUser);
userRouter.delete('/delete', userController.deleteAllUsers);