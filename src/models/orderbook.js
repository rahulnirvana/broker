import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const OrderBook = {
    async getByUserId(userId) {
        return await prisma.orderBook.findMany({ where: { userId } });
    },
};
