import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplate,
} from "./email.js";
import { User } from "./models/user.model.js";
import { Token } from "./models/tokens.model.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { createMessage } from "./cheerio.js";
import { changePersonal } from "./personal.js";
import { Starbucks } from "./models/stabucks.model.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./swagger/config.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));
app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body.user;
  const isValid = checkValidationEmail(email);
  if (!isValid) {
    res.send("이메일 형식이 맞지 않습니다.");
    return;
  }
  const isAuth = await Token.find({ phone: phone });
  if (!isAuth[0]) {
    res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다.");
    return;
  }
  const changepersonal = changePersonal(personal);
  const template = getWelcomeTemplate({ name, phone, prefer });
  const og = await createMessage(prefer);
  const user = new User({
    name,
    email,
    personal: changepersonal,
    prefer,
    pwd,
    phone,
    og: {
      title: og.title,
      description: og.description,
      image: og.image,
    },
  });
  await user.save((_, room) => {
    console.log(room);
    res.send(room.id);
  });
  sendTemplate(email, template);
});

app.get("/users", async (req, res) => {
  const result = await User.find();

  res.send(result);
});

app.post("/tokens/phone", async (req, res) => {
  const isValid = checkValidationPhone(req.body.phone);
  if (!isValid) {
    res.send("휴대폰 번호를 제대로 입력해주세요");
    return;
  }

  const result = await Token.find({ phone: req.body.phone });

  const token = getToken();

  if (result[0]) {
    await Token.updateOne({ phone: req.body.phone }, { token: token });

    sendTokenToSMS(req.body.phone, token);
    res.send("핸드폰으로 인증 문자가 전송되었습니다.");
  } else {
    const phone = new Token({
      phone: req.body.phone,
      token: token,
      isAuth: false,
    });

    await phone.save();

    sendTokenToSMS(req.body.phone, token);
    res.send("핸드폰으로 인증 문자가 전송되었습니다.");
  }
});

app.patch("/tokens/phone", async (req, res) => {
  const isPhone = await Token.find({
    phone: req.body.phone,
    token: req.body.token,
  });

  if (!isPhone[0]) {
    res.send(false);
    return;
  }

  await Token.updateOne({ phone: req.body.phone }, { isAuth: true });

  res.send(true);
});

app.get("/starbucks", async (req, res) => {
  const result = await Starbucks.find();
  console.log(result);
  res.send(result);
});

mongoose.connect("mongodb://my-database:27017/mydocker04");

app.listen(3000, () => {
  console.log("프로그램 실행~");
});
