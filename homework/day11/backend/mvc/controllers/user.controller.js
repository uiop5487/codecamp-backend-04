import { User } from "../models/user.model.js";
import { UserService } from "./services/user.js";
import { Token } from "../models/tokens.model.js";

const userService = new UserService();
export class UserController {
  createUser = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body.user;

    const isValid = userService.checkValidationEmail(email);
    if (!isValid) {
      res.send("이메일 형식이 맞지 않습니다.");
      return;
    }

    const isAuth = await Token.find({ phone: phone });
    if (!isAuth[0]) {
      res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다.");
      return;
    }

    const changepersonal = userService.changePersonal(personal);

    const template = userService.getWelcomeTemplate({ name, phone, prefer });

    const og = await userService.createMessage(prefer);

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

    userService.sendTemplate(email, template);
  };

  fetchUsers = async (req, res) => {
    const result = await User.find();

    res.send(result);
  };
}
