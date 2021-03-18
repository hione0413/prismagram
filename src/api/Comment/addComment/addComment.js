import { isAuthenticated } from "../../../middlewares";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            isAuthenticated(request);
            const { text, postId } = args;
            const { user } = request;
            const comment = await prisma.comment.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    post: {
                        connect: {
                            id: postId
                        }
                    },
                    text
                }
            });
            return comment;
        }
    }
}