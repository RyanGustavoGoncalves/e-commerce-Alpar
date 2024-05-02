import { UserRepository } from "../repository/user.repository.js";
import { UserService } from "../service/User.service.js";

export class UserController {
    constructor() {
        this.repository = new UserRepository();
        this.service = new UserService();
    }
    getUser = async (req, res) => {
        try {
            const users = await this.repository.getUsers();
            console.log(users);
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    getUserByToken = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const token = authHeader.split(" ")[1];

            const user = await this.repository.getUserByToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    registerUser = async (req, res) => {
        const user = req.body;
        try {
            const isValid = await this.service.validarUser(user)
            if (isValid) {
                const newUser = await this.repository.registerUser(user);
                return res.status(201).json(newUser);
            } else {
                return res.status(400).json({ error: "User already exists" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    loginUser = async (req, res) => {
        const user = req.body;
        try {
            const data = await this.repository.loginUser(user);
            return res.status(200).json({ token: data.token, user: data.user, message: "User logged in" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    deleteUser = async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            await this.repository.deleteUser(id);
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    deleteAllUsers = async (req, res) => {
        try {
            await this.repository.deleteAllUsers();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}