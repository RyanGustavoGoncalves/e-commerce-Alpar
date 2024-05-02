import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export class UserRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByToken(token) {
        try {
            console.log(token);
            const tokenFormat = token.replace(/"/g, '');
            const decoded = jwt.verify(tokenFormat, process.env.JWT_SECRET, {
                algorithms: "HS256",
            });

            return await this.prisma.user.findUnique({
                where: {
                    id: decoded.id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
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
            const user = await this.prisma.user.findFirst({
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

            if (!user) {
                throw new Error('Invalid username/email or password');
            }

            const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET);

            return { user: user, token: token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await this.prisma.user.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAllUsers() {
        try {
            return await this.prisma.user.deleteMany();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}