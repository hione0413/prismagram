import { USER_FRAGMENT } from "../../../fragments";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        me: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;

            // 1. 깊은 쿼리 작성 방법 1 : fragment 사용
            // return prisma.user.findOne({
            //     where: {
            //         id: user.id
            //     }
            //     // }).$fragment(USER_FRAGMENT); // prisma2 는 $fragment 지원안함
            // });

            // 2. 깊은 쿼리 작성 방법2 : 커스텀 Type으로 만들어서 가져오기 - 이쪽이 편한 듯
            // const userProfile = await prisma.user.findOne({ where: { id: user.id } });
            // const posts = await prisma.post.findMany({ where: { userId: user.id } });

            // return {
            //     user: userProfile,
            //     posts
            // }

            // 3. 깊은 쿼리 작성 방법2 : filter 값 설정
            return prisma.user.findOne({
                where: { id: user.id },
                include: { posts: true }
            });
        }
    }
}