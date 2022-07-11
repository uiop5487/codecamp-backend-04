import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplate,
} from "./email.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/tokens/phone", (req, res) => {
  // 1. 휴대폰 번호 자릿수 확인
  console.log(req.body.phone);
  res.send("asd");
  const isValid = checkValidationPhone(req.body.phone);
  if (!isValid) return;

  // 2. 핸드폰 토큰 6자리 만들기
  const token = getToken();

  // 3. 핸드폰번호에 토큰 전송
  sendTokenToSMS(req.body.phone, token);
  res.send(`인증완료!!`);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const { name, phone, url, email } = req.body.user;

  const isValid = checkValidationEmail(email);
  if (!isValid) return;

  const template = getWelcomeTemplate({ name, phone, url });

  sendTemplate(email, template);
  res.send("가입완료");
});

app.get("/users", (_, res) => {
  const result = [
    {
      email: "asd@asd.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "123456-1234567",
      prefer: "https://naver.com",
    },
    {
      email: "qew@qwe.com",
      name: "짱구",
      phone: "010-4321-8765",
      personal: "123123-1231231",
      prefer: "https://gmail.com",
    },
    {
      email: "zxc@zxc.com",
      name: "유리",
      phone: "010-1111-2222",
      personal: "456456-4564564",
      prefer: "https://daum.net",
    },
    {
      email: "uio@uio.com",
      name: "훈이",
      phone: "010-3333-4444",
      personal: "789789-7897897",
      prefer: "https://npmjs.com",
    },
    {
      email: "asd@asd.com",
      name: "철수",
      phone: "010-5555-6666",
      personal: "135135-1351351",
      prefer: "https://expressjs.com.com",
    },
  ];
  res.send(result);
});

app.get("/starbucks", (_, res) => {
  const result = [
    { name: "아메리카노", kcal: 14 },
    { name: "카페라떼", kcal: 22 },
    { name: "망고스무디", kcal: 53 },
    { name: "딸기스무디", kcal: 14 },
    { name: "얼그레이", kcal: 53 },
    { name: "자스민티", kcal: 65 },
    { name: "콜드브루", kcal: 17 },
    { name: "자몽에이드", kcal: 38 },
    { name: "레몬에이드", kcal: 95 },
    { name: "쳥포도에이드", kcal: 110 },
  ];
  res.send(result);
});

app.listen(3000, () => {
  console.log(`프로그램 실행~`);
});
