import { Token } from "../models/tokens.model.js";
import { PhoneService } from "./services/phone.js";

const phoneService = new PhoneService();
export class PhoneController {
  createToken = async (req, res) => {
    const isValid = phoneService.checkValidationPhone(req.body.phone);
    if (!isValid) {
      res.send("휴대폰 번호를 제대로 입력해주세요");
      return;
    }

    const result = await Token.find({ phone: req.body.phone });

    const token = phoneService.getToken();

    if (result[0]) {
      await Token.updateOne({ phone: req.body.phone }, { token: token });

      phoneService.sendTokenToSMS(req.body.phone, token);

      res.send("핸드폰으로 인증 문자가 전송되었습니다.");
    } else {
      const phone = new Token({
        phone: req.body.phone,
        token: token,
        isAuth: false,
      });

      await phone.save();

      phoneService.sendTokenToSMS(req.body.phone, token);

      res.send("핸드폰으로 인증 문자가 전송되었습니다.");
    }
  };

  authToken = async (req, res) => {
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
  };
}
