import { Router } from "express";
import { UserController } from "../controller/User.controller.js";
import { authenticateUser } from "../infra/middleware/authMiddleware.js";

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/get', authenticateUser, userController.getUser);
userRouter.get('/get/:id', authenticateUser, userController.getUserById);
userRouter.get('/get/token', authenticateUser, userController.getUserByToken);
userRouter.delete('/delete/:id', authenticateUser, userController.deleteUser);
userRouter.delete('/delete', authenticateUser, userController.deleteAllUsers);