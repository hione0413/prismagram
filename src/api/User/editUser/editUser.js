import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { username, email, firstName, lastName, bio } = args;
            const { user } = request;
            return prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    bio,
                    avatar
                }
            });
        }
    }
}