import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const Holdings = {
    async getByUserId(userId) {
        return await prisma.holding.findMany({ where: { userId } });
    },
};
