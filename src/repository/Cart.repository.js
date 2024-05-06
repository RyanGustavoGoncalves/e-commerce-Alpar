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

    updateTotalPriceCart = async (id, total) => {
        try {
            return await this.prisma.cart.update({
                where: {
                    id: Number(id)
                },
                data: {
                    total: parseFloat(total.toFixed(2)),
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getCartById = async (id) => {
        try {
            return await this.prisma.cart.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    total: true,
                    closed: true,
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

    getAllCartFinish = (id) => {
        try {
            return this.prisma.cart.findMany({
                where: {
                    userId: Number(id),
                    closed: true
                },
                select: {
                    id: true,
                    total: true,
                    dateCreated: true,
                    dateClosed: true,
                    CartItem: {
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

    finishCart = async (id) => {
        try {
            return await this.prisma.cart.update({
                where: {
                    id: Number(id)
                },
                data: {
                    closed: true,
                    dateClosed: new Date()
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}