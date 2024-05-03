import { CartItemRepository } from "../repository/CartItem.repository.js";

export class CartItemController {
    constructor() {
        this.cartItemRepository = new CartItemRepository();
    }
    saveItemInCart = async (req, res) => {
        const { cartId, productId, quantity, price } = req.body;
        try {
            return await this.cartItemRepository.saveItemInCart({
                cartId,
                productId,
                quantity,
                userId,
                price
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}