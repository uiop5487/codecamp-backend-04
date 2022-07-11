import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplate,
} from "./email.js";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(express.json());
app.use(cors());
app.get("/board", (req, res) => {
  // 1. 데이터 조회 => DB에서 데이터 꺼내오기
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "1번 제목입니다.",
      contents: "1번 내용입니다.",
    },
    {
      number: 2,
      writer: "영희",
      title: "2번 제목입니다.",
      contents: "2번 내용입니다.",
    },
    {
      number: 3,
      writer: "훈이",
      title: "3번 제목입니다.",
      contents: "3번 내용입니다.",
    },
  ];

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/board", (req, res) => {
  console.log(req.body);
  // 1. 데이터를 등록 => DB에 접속해 데이터 저장

  // 2. 저장 결과 응답 주기
  res.send("게시물이 등록 되었습니다.");
});

app.post("/tokens/phone", (req, res) => {
  // 1. 휴대폰 번호 자릿수 확인
  const isValid = checkValidationPhone(req.body.phone);
  if (!isValid) {
    res.send("휴대폰 번호를 제대로 입력해주세요");
    return;
  }

  // 2. 핸드폰 토큰 6자리 만들기
  const token = getToken();

  // 3. 핸드폰번호에 토큰 전송
  sendTokenToSMS(req.body.phone, token);
  res.send(`인증완료!!`);
});

app.post("/users", (req, res) => {
  const { name, age, school, email } = req.body.user;

  const isValid = checkValidationEmail(email);
  if (!isValid) return;

  const template = getWelcomeTemplate({ name, age, school, email });

  sendTemplate(email, template);
  res.send("가입완료");
});

app.listen(3000, () => {
  console.log(`프로그램 실행~`);
});
