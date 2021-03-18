import { isAuthenticated } from "../../../middlewares";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        follow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;

            try {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            connect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}