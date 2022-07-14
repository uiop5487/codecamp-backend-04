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
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";
import { Stock } from "./models/stock.model.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/board", async (req, res) => {
  // 1. 데이터 조회 => DB에서 데이터 꺼내오기
  const result = await Board.find();

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/board", async (req, res) => {
  console.log(req.body);

  // 1. 데이터를 등록 => DB에 접속해 데이터 저장
  // 아직 임시저장 상태
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });

  // 실제 db에 전달이 됨
  await board.save();

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

app.get("/stocks", async (req, res) => {
  const result = await Stock.find();
  console.log(result);
  res.send(result);
});

// mongodb 접속
mongoose.connect("mongodb://my-database:27017/mydocker04");

// backend api 서버 오픈
app.listen(3000, () => {
  console.log(`프로그램 실행~`);
});
