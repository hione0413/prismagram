import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        allUsers: () => prisma.users.findMany()
    }
}