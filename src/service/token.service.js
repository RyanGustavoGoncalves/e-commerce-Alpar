import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

export const verifyToken = (token) => {
    try {
        const tokenFormat = token.replace(/"/g, '');
        const decoded = jwt.verify(tokenFormat, process.env.JWT_SECRET, {
            algorithms: "HS256",
        });
        return decoded;
    } catch (error) {
        console.error('Erro ao verificar token:', error.message);
        return null;
    }
};
