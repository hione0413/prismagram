import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args; //roomId와 toId는 동시에 들어오는건 아님
            let room;

            if (roomId === undefined) {
                // 기존 room(메시지방)이 없을 경우 만들어줌
                if (user.id !== toId) {
                    // 스스로 만드는거 막음
                    room = await prisma.room.create({
                        data: {
                            participants: {
                                connect: [
                                    { id: toId }, // 메시지를 받는 사람
                                    { id: user.id } //메시지를 보내는 사람
                                ]
                            }
                        }
                        , include: {
                            participants: true
                        }
                    });
                }
            } else {
                // 기존 room 존재
                room = await prisma.room.findOne({
                    where: { id: roomId }
                    , include: {
                        participants: true
                    }
                });
            }

            // console.log("room check::: ", room);

            if (!room) {
                throw ("Room not found");
            }

            // room에 들어있는 참여자들 아이디 필터링
            const getToIds = room.participants.filter(
                participant => participant.id !== user.id
            );
            const newMessage = await prisma.message.create({
                data: {
                    text: message,
                    from: {
                        connect: {
                            id: user.id
                        }
                    },
                    to: {
                        connect: {
                            id: roomId ? getToIds[0].id : toId    //roomId가 있으면 toId가 없을거니까? 생각 중...
                        }
                    },
                    room: {
                        connect: {
                            id: room.id
                        }
                    }
                }
            });

            // console.log("newMessage Check ::: ", newMessage);
            return newMessage;
        }
    }
}