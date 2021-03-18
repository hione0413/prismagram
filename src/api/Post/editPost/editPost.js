import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id, caption, location, action } = args;
            const { user } = request;

            // 기존 포스트 작성자 체크
            const postExist = await prisma.post.count({
                where: {
                    id: id
                    , user: {
                        id: user.id
                    }
                }
            });

            console.log("post update 권한체크 postExist::: ", postExist);

            if (postExist > 0) {
                // 수정권한 있음
                if (action === EDIT) {
                    return prisma.post.update({
                        data: {
                            caption
                            , location
                        },
                        where: {
                            id: id
                        }
                    });
                } else if (action === DELETE) {
                    // prisma2는 prisma1처럼 @relation(onDelete:CASCADE)를 지원하지 않기 때문에
                    // 관련 있는 부분들을 먼저 직접 지워줘야 한다. (DB에 세팅하든 코드로 세팅하든)
                    // 의문: 트랜잭션 처리는 어떻게 되는지? -> Prisma 문서에서는 아직 지원하지 않으니 DB에서 세팅하라고 함. 일단 보류

                    //const result = prisma.transaction(async tx => {
                    try {
                        const delLike = await prisma.like.deleteMany({
                            where: {
                                postId: { equals: id }
                            }
                        });
                        const delFile = await prisma.file.deleteMany({
                            where: {
                                postId: { equals: id }
                            }
                        });
                        const delPost = await prisma.post.delete({
                            where: {
                                id: id
                            }
                        });
                        // await tx.commit()
                        //})
                        return delPost;
                    } catch {
                        throw ("Post 삭제 중 트랜잭션 에러 발생");
                    }
                }
            } else {
                // 권한 없음
                throw Error("You can't update post");
            }
        }
    }
}
