import { Router } from "express";
import { CartItemController } from "../controller/CartItem.controller.js";

export const cartItemRouter = Router();
const cartItemController = new CartItemController();

cartItemRouter.post('/', cartItemController.saveItemInCart); 
cartItemRouter.put('/:cartItem', cartItemController.updateQuantity);
cartItemRouter.delete('/:cartItem', cartItemController.deleteItemFromCart);