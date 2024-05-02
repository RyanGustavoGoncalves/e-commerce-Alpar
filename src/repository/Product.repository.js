import { PrismaClient } from "@prisma/client";

export class ProductRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProducts() {
        return await this.prisma.product.findMany();
    }

    async saveProduct({ name, description, price, imageUrl }) {
        console.log(name, description, price, imageUrl);
        return await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
            },
        });
    }

    async deleteProduct(id) {
        return await this.prisma.product.delete({
            where: {
                id: parseInt(id),
            },
        });
    }
}