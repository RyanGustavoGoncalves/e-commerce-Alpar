import { PrismaClient } from "@prisma/client";

export class ProductRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async saveProduct({ name, price }) {
        try {
            return await this.prisma.product.create({
                data: {
                    name,
                    price
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}