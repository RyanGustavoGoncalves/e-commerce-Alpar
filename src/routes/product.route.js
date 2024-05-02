import { Router } from "express";
import { ProductController } from "../controller/Product.controller.js";

export const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', productController.saveProduct);
productRouter.get('/', productController.getProducts);
productRouter.delete('/:id', productController.deleteProduct);