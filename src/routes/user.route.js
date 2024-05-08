import { Router } from "express";
import { authenticateUser } from "../infra/middleware/authMiddleware.js";
import { UserController } from "../controller/user.controller.js";
import { adminMiddleware } from "../infra/middleware/adminMiddleware.js";

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/get', authenticateUser, adminMiddleware, userController.getUser);
userRouter.get('/get/byToken', authenticateUser, userController.getUserByToken);
userRouter.delete('/delete/:id', authenticateUser, userController.deleteUser);
userRouter.delete('/delete', authenticateUser, userController.deleteAllUsers);