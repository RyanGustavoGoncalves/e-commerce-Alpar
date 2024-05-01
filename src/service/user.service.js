import e from "express";
import { UserRepository } from "../repository/user.repository.js";

export class userService {
    constructor() {
        this.repository = new UserRepository();
    }

    validarUser = async (user) => {
        const verifyUser = await this.repository.getUsers();
        console.log(verifyUser);
        const existingUser = verifyUser.find((element) => {
            console.log(element);
            return element.username === user.username || element.email === user.email;
        });

        return !existingUser;
    }

}