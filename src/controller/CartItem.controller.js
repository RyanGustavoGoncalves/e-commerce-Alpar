import { CartItemRepository } from "../repository/CartItem.repository.js";
import { CartItemService } from "../service/CartItem.service.js";

export class CartItemController {
    constructor() {
        this.repository = new CartItemRepository();
        this.service = new CartItemService();
    }
    saveItemInCart = async (req, res) => {
        const { cartId, productId, quantity, price } = req.body;
        try {
            const cartItem = await this.repository.saveItemInCart({ cartId, productId, quantity, price });
            res.status(201).json(cartItem);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}