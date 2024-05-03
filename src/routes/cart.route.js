import { Router } from "express";
import { CartController } from "../controller/Cart.controller.js";

export const cartRouter = Router();
const cartController = new CartController();

cartRouter.post('/', cartController.saveProductInCart); 