import { CartItemRepository } from "../repository/CartItem.repository.js";

export class CartItemService {
    constructor() {
        this.repository = new CartItemRepository();
    }

    calculateTotal = (cartItems) => {
        return cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }

    verifItemInCart = async (productId, cartId) => {
        const cartItems = await this.repository.getItemsInCart(cartId);
        console.log(cartItems);
        return cartItems.some((item) => item.productId === productId);

    }
}