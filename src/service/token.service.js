import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Erro ao verificar token:', error.message);
        return null;
    }
};
