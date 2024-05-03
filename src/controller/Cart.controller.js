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
}