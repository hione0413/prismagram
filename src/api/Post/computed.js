import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Post: {
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            const result = prisma.like.count({
                where: {
                    AND: [
                        {
                            user: {
                                id: user.id
                            }
                        },
                        {
                            post: {
                                id: parentId
                            }
                        }
                    ]
                }
            })
            return result > 0;
        },
        likeCount: (parent) => prisma.like.count({
            where: {
                postId: parent.id
                // post: {
                //     id: parent.id
                // }
            }
        })
    }
}