import { CartRepository } from "../repository/Cart.repository.js";

export class CartController {

    constructor() {
        this.repository = new CartRepository();
    }

    createCart = async (req, res) => {
        try {
            const { userId, total, closed } = req.body;
            console.log(userId, total, closed);
            const cart = await this.repository.createCart({ userId, total, closed });
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    getAllCartItemFromCart = async (req, res) => {
        try {
            const cartID = req.params.id;
            const cart = await this.repository.getAllCartItemFromCart(cartID);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    getCartById = async (req, res) => {
        try {
            const cartID = req.params.id;
            const cart = await this.repository.getCartById(cartID);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    getAllCartFinish = async (req, res) => {
        try {
            const userId = req.params.id;
            const cart = await this.repository.getAllCartFinish(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    updateTotalPriceCart = async (req, res) => {
        try {
            const cartID = req.params.id;
            const total = req.body.total;
            const cart = await this.repository.updateTotalPriceCart(cartID, total);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    

    finishCart = async (req, res) => {
        try {
            const cartID = req.params.id;
            const cart = await this.repository.finishCart(cartID);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}