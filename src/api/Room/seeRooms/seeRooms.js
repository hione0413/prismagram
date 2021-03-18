import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        seeRooms: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.room.findMany({
                where: {
                    participants: {
                        some: {
                            id: user.id
                        }
                    }
                },
                include: {
                    participants: true
                }
            });
        }
    }
}