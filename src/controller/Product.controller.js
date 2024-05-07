import { ProductRepository } from "../repository/Product.repository.js";

export class ProductController {
    constructor() {
        this.repository = new ProductRepository();
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.repository.getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar os produtos' });
        }
    }

    getProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await this.repository.getProduct(id);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o produto' });
        }
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

    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            await this.repository.deleteProduct(id);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o produto' });
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const product = req.body;
            await this.repository.updateProduct(id, product);
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o produto' });
        }
    }
}