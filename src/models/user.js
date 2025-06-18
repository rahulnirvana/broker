import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const User = {
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    },
    async create(email, password_hash) {
        return await prisma.user.create({
            data: {
                email,
                passwordHash: password_hash,
            },
        });
    },
};

export default { User };
