import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default{
    Query : {
        userById : async(_, args) => {
            const{id} = args;
            return await prisma.user.findOne({id})
        }
    }
}