import { PrismaClient } from "@prisma/client";

export class CartItemRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    saveItemInCart = async ({ cartId, productId, quantity, price }) => {
        try {
            return await this.prisma.cartItem.create({
                data: {
                    quantity,
                    price,
                    cart: {
                        connect: {
                            id: cartId
                        }
                    },
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}