// import dotenv from "dotenv";
// import path from "path";
// //require("dotenv").config()
// dotenv.config({path: path.resolve(__dirname, ".env")});
import "./env";
import { GraphQLServer } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils"
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

console.debug("__dirname ::: ", __dirname);
console.debug("PORT ::: ", process.env.PORT);

const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

//const server = new GraphQLServer({typeDefs, resolvers});
// console.debug("schema ::: ", schema);
// schema  : typeDefs 와 resolvers가 들어있다.
// context : resolver 사이에서 정보를 공유할 때 사용
const server = new GraphQLServer({
    schema
    , context: ({ request }) => ({ request, isAuthenticated })
});

// server.express.use(logger("dev"));
server.express.use(authenticateJwt);
// 1. 모든경로를 미들웨어로 보호, 서버에 전달되는 모든 요청은 authenticateJwt 함수를 통과한다.
// 2. authenticateJwt 함수 에서는 passport.authenticate("jwt") 함수를 실행한다.
// 3. 위 함수는 Strategy를 활용해 jwt 토큰을 추출한다.
// 4. 토큰이 추출되면 verifyUser를 payload와 함께 실행한다.
// 5. payload는 토큰에서 해석된 id를 받아서 user를 찾아 리턴한다.
// 6. authenticateJwt 내부의 콜백함수가 실행되어 사용자가 있으면 그 사용자를 req에 추가해준다.
// 7. server.js에서 context에 request를 담아준다.

server.start({ port: PORT }, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});