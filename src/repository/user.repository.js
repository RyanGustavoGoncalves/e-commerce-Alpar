import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async registerUser({ username, password }) {
        try {
            return await this.prisma.user.create({
                data: {
                    username,
                    password,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }  
}