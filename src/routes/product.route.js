import { Router } from "express";
import { ProductController } from "../controller/Product.controller.js";
import { adminMiddleware } from "../infra/middleware/adminMiddleware.js";

export const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', adminMiddleware, productController.saveProduct);
productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.delete('/:id', adminMiddleware, productController.deleteProduct);
productRouter.put('/:id', adminMiddleware, productController.updateProduct);