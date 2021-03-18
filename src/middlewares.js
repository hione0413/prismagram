// express middleware가 아닌 graphQl middleware

// login한 User가 있는지 먼저 확인한다.
export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error("You need to log in to perform this action");
    }
    return;
};
