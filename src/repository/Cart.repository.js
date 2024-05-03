import { PrismaClient } from "@prisma/client";

export class CartRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    createCart = async ({ userId, total, closed }) => {
        try {
            return await this.prisma.cart.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    total,
                    closed
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllCartItemFromCart = async (id) => {
        try {
            return await this.prisma.cart.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    CartItem:
                    {
                        select: {
                            id: true,
                            quantity: true,
                            price: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    price: true,
                                    imageUrl: true
                                }
                            }
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