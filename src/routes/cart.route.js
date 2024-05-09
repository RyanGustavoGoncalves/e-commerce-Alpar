import { Router } from "express";
import { CartController } from "../controller/Cart.controller.js";

export const cartRouter = Router();
const cartController = new CartController();

cartRouter.get('/:id/last', cartController.getLastCartId);
cartRouter.get('/cartFinish/:id', cartController.getAllCartFinish);
cartRouter.get('/items/:id', cartController.countItems);
cartRouter.get('/:id', cartController.getCartById);
cartRouter.post('/', cartController.createCart);
cartRouter.put('/:id', cartController.updateTotalPriceCart);
cartRouter.put('/finish/:id', cartController.finishCart);
