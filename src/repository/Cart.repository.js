import { PrismaClient } from "@prisma/client";

export class CartRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    saveProductInCart = async () => {
        try {
            return await this.prisma.cart.create({
                data: {
                    productId,
                    quantity,
                    userId,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}