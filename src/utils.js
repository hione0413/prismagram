import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mailgun from "mailgun-js";
import jsonwebtoken from "jsonwebtoken";

// 이메일 분실 문의 시 암호 전송
export const generateSecret = () => {
    const randomNumber1 = Math.floor(Math.random() * adjectives.length);
    const randomNumber2 = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNumber1]} ${nouns[randomNumber2]}`;

};

// 설정된 email을 전송, sendMail은 외부에서 호출하지 않을 것이므로 export 키워드 제외
const sendMail = (email) => {
    const DOMAIN = process.env.MAILGUN_DOMAIN_NM;
    const API_KEY = process.env.MAILGUN_API_KEY;
    const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
    
    mg.messages().send(email, function (error, body) {
        console.log(body);
    }); 
};

// email 정보를 세팅해준다.
export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "ppossing35@gmail.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login secret it <strong>${secret}</strong>.<br/>Copy paste on the app/web to log in`
    }

    return sendMail(email);
};

export const generateToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.JWT_SECRET);
}