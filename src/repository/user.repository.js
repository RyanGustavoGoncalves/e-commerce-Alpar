import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async registerUser({ username, email, password }) {
        try {
            return await this.prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}