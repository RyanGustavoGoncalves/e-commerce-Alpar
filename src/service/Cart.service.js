import jwt from "jsonwebtoken";
import { CartRepository } from "../repository/Cart.repository.js";

export class CartService {
    constructor() {
        this.repository = new CartRepository();
    }

    getLastCartByUserToken = async (token) => {
        try {
            const decode = jwt.decode(token);
            return await this.repository.getLastCartByUserToken(decode.id);
        } catch (error) {
            throw error;
        }
    }

}