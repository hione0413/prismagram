import { generateToken } from "../../../utils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email, secret } = args;
            const user = await prisma.user.findOne({
                where: {
                    email: email
                }
            });

            if (user.loginSecret === secret) {
                // 로그인이 확인되면 loginSecret을 삭제하자.
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        loginSecret: ''
                    }
                });

                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret conbination");
            }
        }
    }
}