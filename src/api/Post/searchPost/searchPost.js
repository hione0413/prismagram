import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        searchPost: async (_, args) => prisma.post.findMany({
            where: {
                OR: [
                    { location: { contains: args.term } },
                    { caption: { contains: args.term } }
                ]
            }
        })
    }
};