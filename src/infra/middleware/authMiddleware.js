// middleware/authMiddleware.js

import { verifyToken } from "../../service/token.service.js";

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token de autenticação inválido' });
    }

    req.user = decoded;

    next();
};
