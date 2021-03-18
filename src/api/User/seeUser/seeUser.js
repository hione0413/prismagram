import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        seeUser: async (_, args, { request }) => {
            // isAuthenticated(request); 공용 프로필 보는 부분이라 권한 체크 안해도 됨
            const { id } = args;
            // const user = await prisma.user.findOne({ where: { id: id } });
            // const posts = await prisma.post.findMany({ where: { userId: id } });

            // return {
            //     user,
            //     posts
            // }
            return prisma.user.findOne({
                where: { id: id },
                include: { posts: true }
            });
        }
    }
}