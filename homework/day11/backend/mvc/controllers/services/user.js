import nodemailer from "nodemailer";
import axios from "axios";
import cheerio from "cheerio";
import "dotenv/config";
import { UtilsService } from "./utils.js";

const utilsService = new UtilsService();

export class UserService {
  checkValidationEmail = (email) => {
    if (email === undefined) {
      console.log("이메일이 없습니다!");
      return false;
    }

    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (reg.test(email) === false) {
      console.log("이메일 형식이 맞지 않습니다!!");
      return false;
    }

    return true;
  };

  getWelcomeTemplate = ({ name, phone, prefer }) => {
    const mytemplate = `
        <html>
            <body>
              <div>
                <div width: 500px;>
                  <h1>${name}님 가입을 환영합니다!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>전화번호: ${phone}</div>
                  <div>좋아하는 사이트: ${prefer}</div>
                  <div style="color: red; font-weight: 700">가입일: ${utilsService.getToday()}</div>
                </div>
              </div>
            </body>
        </html>`;

    return mytemplate;
  };

  sendTemplate = async (email, template) => {
    // console.log(`${email}주소로 가입환영 템플릿을 보냅니다.${template}`);
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // gmail 계정 입력
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: email,
      subject: "가입을 축하합니다!!",
      html: template,
    });

    console.log(result);
  };

  changePersonal = (personal) => {
    return personal.split("").reduce((acc, cur, i) => {
      if (i >= 7) return acc + "*";
      return acc + cur;
    });
  };

  createMessage = async (prefer) => {
    const result = await axios.get(`https://${prefer}`);

    let og = {};
    const $ = cheerio.load(result.data);
    $("meta").each((_, el) => {
      if (
        $(el).attr("property")?.includes("og:title") ||
        $(el).attr("property")?.includes("og:image") ||
        $(el).attr("property")?.includes("og:description")
      ) {
        const key = $(el).attr("property").replace("og:", "");
        const value = $(el).attr("content");
        og[key] = value;
      }
    });
    return og;
  };
}
