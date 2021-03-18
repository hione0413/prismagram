import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        seeRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            const canSee = await prisma.room.count({
                where: {
                    participants: {
                        some: {
                            id: user.id
                        }
                    }
                }
            });

            if (canSee > 0) {
                return prisma.room.findOne({
                    where: {
                        id: id
                    },
                    include: {
                        participants: true,
                        messages: true
                    }
                });
            } else {
                throw ("You can't see this");
            }
        }
    }
}