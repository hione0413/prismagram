import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, filrstName = "", lastName = "", bio = "" } = args;
            const user = await prisma.user.create({
                username,
                email,
                filrstName,
                lastName,
                bio
            });
            return user;
        }
    }
}