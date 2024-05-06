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

    getCartItems = async () => {
        try {
            return await this.prisma.cartItem.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getItemsInCart = async (cartId) => {
        try {
            return await this.prisma.cartItem.findMany({
                where: {
                    cartId
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updateQuantity = async (id, quantity) => {
        try {
            console.log(id, quantity);
            return await this.prisma.cartItem.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    quantity
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    deleteItemFromCart = async (id) => {
        try {
            return await this.prisma.cartItem.delete({
                where: {
                    id: parseInt(id)
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}