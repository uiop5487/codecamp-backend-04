import express from "express";
import cors from "cors";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { Phone } from "./models/phone.models.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tokens/phone", async (req, res) => {
  const isValid = checkValidationPhone(req.body.phone);
  if (!isValid) {
    res.send("휴대폰 번호를 제대로 입력해주세요");
    return;
  }

  const token = getToken();

  const result = await Phone.find();
  const isPhone = result.reduce((_, cur) => cur.phone === req.body.phone);
  console.log();
  if (isPhone) {
    await Phone.updateOne({ phone: req.body.phone }, { token: token });

    sendTokenToSMS(req.body.phone, token);
    res.send(`${req.body.phone}에 인증문자가 발송 되었습니다!!`);
  } else {
    const phone = new Phone({
      phone: req.body.phone,
      token: token,
      isAuth: false,
    });

    await phone.save();

    sendTokenToSMS(req.body.phone, token);
    res.send(`${req.body.phone}에 인증문자가 발송 되었습니다!!`);
  }
});

app.patch("/tokens/phone", async (req, res) => {
  const result = await Phone.find();
  const isPhone = result.reduce((_, cur) => cur.phone === req.body.phone);
  if (!isPhone) {
    res.send(false);
    return;
  }
  const isToken = result.reduce((_, cur) => cur.token === req.body.token);
  if (!isToken) {
    res.send(false);
    return;
  }
  await Phone.updateOne({ phone: req.body.phone }, { isAuth: true });

  res.send(true);
});

mongoose.connect("mongodb://my-database:27017/mydocker04");

app.listen(3000, () => {
  console.log(`프로그램 실행~`);
});
