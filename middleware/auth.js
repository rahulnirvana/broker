import { verifyAccessToken, verifyRefreshToken } from '../utils/jwt.js';

export function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (err) {
        try {
            const payload = verifyRefreshToken(token);
            req.user = payload;
            req.isRefreshToken = true;
            next();
        } catch (refreshErr) {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
};