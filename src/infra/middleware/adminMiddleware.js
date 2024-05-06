import { verifyToken } from "../../service/token.service.js";

export const adminMiddleware = (req, res, next) => {
    const user = verifyToken(req.headers.authorization.split(" ")[1]);
    if (user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
}