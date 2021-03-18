import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    Mutation: {
        upload: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, files } = args;
            const post = await prisma.post.create({
                data: {
                    caption,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            });

            console.log("post::: ", post);

            files.forEach(async (file) => {
                await prisma.file.create({
                    data: {
                        url: file,
                        post: {
                            connect: {
                                id: post.id
                            }
                        }
                    }
                });

                console.log("file::: ", file);
            });

            return post;
        }
    }
}