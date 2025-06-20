import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const Positions = {
    async getByUserId(userId) {
        return await prisma.position.findMany({ where: { userId } });
    },
};

