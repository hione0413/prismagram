import { PrismaClient, OrderByArg } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        seeFeed: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user.findOne({
                where: {
                    id: user.id
                }
            }).following();

            // 내가 팔로우하는 유저들의 글 + 내 글을 피드로 띄우기 위함
            return prisma.post.findMany({
                where: {
                    user: {
                        id: {
                            in: [...following.map(user => user.id), user.id]
                        }
                    }
                },
                orderBy: {
                    createAt: OrderByArg.desc
                }
            });
        }
    }
}