import { pool } from '../db.js';

const User = {
    async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0];
    },
    async create(email, password_hash) {
        const { rows } = await pool.query(
            'INSERT INTO users (email, password_hash, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
            [email, password_hash]
        );
        return rows[0];
    },
};

export default { User };
