import { PrismaClient } from "@prisma/client";

export class ProductRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProducts() {
        return await this.prisma.product.findMany();
    }
    async getProduct(id){
        return await this.prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });
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
        try {
            const cartItems = await this.prisma.cartItem.findMany({
                where: {
                    productId: parseInt(id),
                },
            });
    
            await Promise.all(
                cartItems.map(async (cartItem) => {
                    await this.prisma.cartItem.delete({
                        where: {
                            id: cartItem.id,
                        },
                    });
                })
            );
    
            return await this.prisma.product.delete({
                where: {
                    id: parseInt(id),
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async updateProduct(id, product) {
        return await this.prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: {
                ...product,
            },
        });
    }
}