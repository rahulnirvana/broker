import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';

export function generateAccessToken(userId) {
    return sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
export function generateRefreshToken(userId) {
    return sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}
export function verifyAccessToken(token) {
    return verify(token, ACCESS_TOKEN_SECRET);
}
export function verifyRefreshToken(token) {
    return verify(token, ACCESS_TOKEN_SECRET);
}
