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
            const exist = await this.service.verifItemInCart(productId, cartId);
            if (!exist) {
                const cartItem = await this.repository.saveItemInCart({ cartId, productId, quantity, price });
                res.status(201).json(cartItem);
            } else {
                res.status(400).json({ message: "Item already in cart" });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateQuantity = async (req, res) => {
        try {
            const id = req.params.cartItem;
            const { quantity } = req.body;
            console.log(id, quantity);
            const cart = await this.repository.updateQuantity(id, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteItemFromCart = async (req, res) => {
        try {
            const id = req.params.cartItem;
            await this.repository.deleteItemFromCart(id);
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}