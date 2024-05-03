import { PrismaClient } from "@prisma/client";

export class CartRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    createCart = async ({ userId, total, closed }) => {
        try {
            console.log("repository", userId, total, closed);
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
}