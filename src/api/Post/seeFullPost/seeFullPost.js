import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Query: {
        seeFullPost: async (_, args) => {
            const { id } = args;
            const post = await prisma.post.findOne({
                where: { id: id },
                include: {
                    user: true,     // 방법1: 모든 column 자동 매핑
                    comments: true,
                    files: {        // 방법2: 선택한 column만 매핑
                        select: {
                            id: true,
                            url: true
                        }
                    }
                }
            });

            return post;
        }
    }
}