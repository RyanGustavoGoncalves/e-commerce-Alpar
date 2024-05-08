import { CartRepository } from "../repository/Cart.repository.js";
import { verifyToken } from "./token.service.js";

export class CartService {
    constructor() {
        this.repository = new CartRepository();
    }

    getLastCartByUserToken = async (token) => {
        try {
            const decode = verifyToken(token);
            const data = await this.repository.getLastCartByUserToken(decode.id);
            const allCartsClosed = data.cart.every(cart => cart.closed === true);
            return allCartsClosed;
        } catch (error) {
            throw error;
        }
    }
}