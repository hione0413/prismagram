import { isAuthenticated } from "../../../middlewares";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };
            try {
                const existingLike = await prisma.like.count({
                    where: filterOptions
                });

                if (existingLike !== 0) {
                    // TODO : 좋아요가 존재할 경우 삭제
                    const deleteResult = await prisma.like.deleteMany({
                        where: filterOptions
                    });

                } else {
                    // 좋아요가 존재하지 않을 경우
                    // 좋아요(like)에 user와 post를 넣어준다.
                    const newLike = await prisma.like.create({
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
                            }
                        }
                    });

                }
                return true;

            } catch (error) {
                return false;

            }
        }
    }
};
