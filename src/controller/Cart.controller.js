import { CartRepository } from "../repository/Cart.repository.js";
import { CartService } from "../service/Cart.service.js";

export class CartController {

    constructor() {
        this.repository = new CartRepository();
        this.service = new CartService();
    }

    createCart = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const { userId, total, closed } = req.body;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const token = authHeader.split(" ")[1];
            const cartExist = await this.service.getLastCartByUserToken(token);
            if (cartExist) {
                const cart = await this.repository.createCart({ userId, total, closed });
                res.status(201).json(cart);
            } else {
                res.status(400).json({ message: "Cart is open" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    countItems = async (req, res) => {
        try {
            const cartID = req.params.id;
            const cart = await this.repository.countItems(cartID);
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