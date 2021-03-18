import { isAuthenticated } from "../../../middlewares"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        unfollow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;

            try {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                });

                return true;
            } catch  {
                return false;
            }
        }
    }
}