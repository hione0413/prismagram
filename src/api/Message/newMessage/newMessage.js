import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    // prisma2는 Subscription 지원 안함 -> GraphQl 기존 방식 찾아봐야 할 듯
    Subscription: {
        newMessage: {
            subscribe: async (_, args) => {
                const { roomId } = args;
                return prisma.message.subscribe({
                    AND: [
                        { mutation_in: "CREATE" },
                        {
                            node: {
                                room: { id: roomId }
                            }
                        }
                    ]
                }).node(); // node() : subscribe 에서 node(즉 message) 추출
            },
            // payload는 Message만 가지고 있지 않고 subscription payload도 가지고 있다.
            resolve: (payload, args, context) => {
                console.log(args, context);
                return payload;
            }
        }
    }
}