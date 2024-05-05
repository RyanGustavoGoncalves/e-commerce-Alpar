import { Router } from "express";
import { CartController } from "../controller/Cart.controller.js";

export const cartRouter = Router();
const cartController = new CartController();

cartRouter.post('/', cartController.createCart); 
cartRouter.get('/items/:id', cartController.getAllCartItemFromCart);
cartRouter.put('/:id', cartController.updateTotalPriceCart);
cartRouter.get('/:id', cartController.getCartById);