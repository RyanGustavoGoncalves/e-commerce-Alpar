import { ProductRepository } from "../repository/Product.repository.js";

export class ProductController {
    constructor() {
        this.repository = new ProductRepository();
    }

    saveProduct = async (req, res) => {
        try {
            const product = await this.repository.saveProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar o produto' });
        }
    }
}