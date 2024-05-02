import { Router } from "express";
import { CartController } from "../controller/Cart.controller";

export const cartRouter = Router();
const cartController = new CartController();

cartController.post('/', cartController.saveProductInCart);