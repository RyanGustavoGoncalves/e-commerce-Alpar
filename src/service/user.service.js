import { UserRepository } from "../repository/user.repository.js";

export class userService {
    constructor() {
        this.repository = new UserRepository();
    }

    validarUser = async (user) => {
        const verifyUser = await this.repository.getUsers(user);
        console.log(verifyUser);
        verifyUser.map((user) => {
            if (user.username === user.username || user.email === user.email) {
                return false;
            } else {
                return true;
            }
        });
    }
}