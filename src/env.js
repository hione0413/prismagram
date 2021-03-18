import dotenv from "dotenv";
import path from "path";
//require("dotenv").config()
dotenv.config({path: path.resolve(__dirname, ".env")});

// 페이지마다 위 코드를 import 해줘야 했던 것을 env.js 를 server에서 import 함으로써 매번 api js마다 추가하지 않아도 값을 가져올 수 있게 된다.