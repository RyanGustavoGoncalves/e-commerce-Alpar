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

    async loginUser({ usernameOrEmail, password }) {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username: usernameOrEmail,
                            password
                        },
                        {
                            email: usernameOrEmail,
                            password
                        }
                    ]
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}