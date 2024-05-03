import { Router } from "express";
import { CartItemController } from "../controller/CartItem.controller.js";

export const cartItemRouter = Router();
const cartItemController = new CartItemController();

cartItemRouter.post('/', cartItemController.saveItemInCart); 
cartItemRouter.get('/:cartItem', cartItemController.updateQuantity);