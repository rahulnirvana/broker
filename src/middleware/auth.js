import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '../utils/jwt.js';

export const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    let payload = null;
    try {
        payload = verifyAccessToken(token);
    } catch (err) {
        try { //optional
            payload = verifyRefreshToken(token);
        } catch (refreshErr) {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
    req.user = payload;
    return next();
};

export const refreshAccessToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const payload = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken(payload.userId);
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
};