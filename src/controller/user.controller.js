import { UserRepository } from "../repository/user.repository";

export class UserController {
    constructor() {
        this.repository = new UserRepository();
    }

    registerUser = async (req, res) => {
        const user = req.body;
        try {
            const newUser = await this.repository.registerUser(user);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}