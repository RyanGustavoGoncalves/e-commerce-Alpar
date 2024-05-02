import express from 'express';
import cors from 'cors';
import { userRouter } from '../../routes/user.route.js';
import { productRouter } from '../../routes/product.route.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

export class Server {
    route = "/api/v1"
    constructor(port) {
        this.app = express();

        this.setMiddlewares();

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors({ origin: '*' }))
    }

    setRoutes() {
        this.app.use(express.static('public'));
        this.app.use("/home", authenticateUser, express.static('/home'));
        this.app.use(this.route, userRouter);
        this.app.use(`${this.route}/product`, authenticateUser, productRouter);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log("app started. Listen at port " + port);
        });
    }
}
