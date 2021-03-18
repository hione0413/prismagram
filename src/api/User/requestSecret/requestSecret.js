import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args, {request}) => {
            const { email } = args;
            const loginSecret = generateSecret();
            //console.log(loginSecret);
            
            try {
                // password secret Email 전송
                await sendSecretMail(email, loginSecret);
                // 해당 user의 secret column update
                await prisma.user.update({  // FROM USER
                    data: {loginSecret},    // 같은 칼럼명의 데이터를 교체한다(UPDATA SET) 
                    where: {email}          // WHERE
                });
                return true;
            } catch (error) {
                console.debug(error);
                return false;
            }
        }
    }
}