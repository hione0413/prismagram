import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
    // issuer : 'accounts.examplesoft.com',
    // audience : 'yoursite.net'
}

// done : 사용자를 찾았을 때 호출할 함수
// payload : Strategy 가 작업을 한 결과물을 payload에 담아 전달해준다.
const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user.findOne({ where: { id: payload.id } });
        if (user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}

// 미들웨어 함수 -> req, res, next를 인자로 받는다.
// 토큰을 받아서 작업
// passport는 쿠키와 세션 작업하는데 유용 : 쿠키를 가져오거나 만들어줌
// verifyUser 에서 user 가져옴 -> 사용자가 존재한다면 그 사용자 정보를 req에 붙여줌
export const authenticateJwt = (req, res, next) => {
    // sessions false : passport에 어떤 것도 입력되기를 원치 않아서
    passport.authenticate("jwt", { sessions: false }, (error, user) => {
        //console.log("authenticateJwt login User info", user);
        if (user) {
            req.user = user;
        }
        // express에서는 미들웨어를 지나서 라우트가 실행된다.
        next();
    })(req, res, next); //inner function 실행
}

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

// passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, verifyUser) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return verifyUser(err, false);
//         }
//         if (user) {
//             return verifyUser(null, user);
//         } else {
//             return verifyUser(null, false);
//             // or you could create a new account
//         }
//     });
// }));