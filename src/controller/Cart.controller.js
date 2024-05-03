import { CartRepository } from "../repository/Cart.repository.js";

export class CartController {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async saveProductInCart(req, res) {
        const { productId, quantity } = req.body;
        const { id } = req.user;
        try {
            const cart = await this.cartRepository.saveProductInCart({
                productId,
                quantity,
                userId: id,
            });
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}