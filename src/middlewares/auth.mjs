import jwt from 'jsonwebtoken';
import { errorRes } from '../utils/utils.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { User } from '../models/index.mjs';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorRes(res, new Error('No authentication token provided'), HttpStatusCode.UNAUTHORIZED);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return errorRes(res, new Error('User not found'), HttpStatusCode.UNAUTHORIZED);
        }

        req.user = user;
        next();
    } catch (error) {
        return errorRes(res, new Error('Invalid or expired token'), HttpStatusCode.UNAUTHORIZED);
    }
};

export { authMiddleware };
