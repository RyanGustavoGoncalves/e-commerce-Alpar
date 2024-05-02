import { PrismaClient } from "@prisma/client";

export class ProductRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async saveProduct({ name, description, price, imageUrl, closed }) {
        console.log(name, description, price, imageUrl, closed);
        return await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                closed,
            },
        });
    }
}