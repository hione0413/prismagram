import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    //  Compute Resolver : 해당 필드는 먼저 .prisma 에서 찾은 뒤 없으면 서버에서 찾는다.
    // 즉 firstName, lastName이 DB Column으로 있을 때 fullName은 Column을 따로 두지 않아도 이 기능으로 만들어줄 수 있다.
    // 참조 : https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08
    User: {
        fullName: (parent, __, { request }) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;   // parent안의 id 값을 가져와 parentId 변수에 할당
            const result = prisma.user.count({
                where: {
                    AND: [
                        { id: user.id },
                        {
                            followers: {
                                some: {
                                    id: parentId
                                }
                            }
                        }
                    ]
                }
            });
            return result > 0;
        },
        isSelf: (parent, _, { request }) => {
            // 자신의 프로파일 요청여부
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
}