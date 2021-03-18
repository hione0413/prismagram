import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering#filter-on-related-records 참조
export default {
    Query: {
        searchUser: async (_, args) => {
            return prisma.user.findMany({
                where: {
                    OR: [
                        { username: { contains: args.term } },
                        { firstName: { contains: args.term } },
                        { lastName: { contains: args.term } }
                    ]
                }
            })
        }
    }
};