import { hash as _hash, compare } from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import UserModel from '../models/user.js';
const { User } = UserModel;

export const signUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
        const existing = await User.findByEmail(email);
        if (existing) return res.status(409).json({ error: 'User already exists' });
        const hash = await _hash(password, 10);
        const user = await User.create(email, hash);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        const valid = await compare(password, user.passwordHash);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};