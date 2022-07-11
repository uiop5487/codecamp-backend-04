import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export const checkValidationEmail = (email) => {
  const arr = email.split(".")[0].split("@");
  if (email === undefined) {
    console.log("이메일이 없습니다!");
    return false;
  }
  if (!email.includes("@") || !arr[0] || !arr[1]) {
    console.log("이메일 형식이 맞지 않습니다!!");
    return false;
  }
  return true;
};

export const getWelcomeTemplate = ({ name, phone, url }) => {
  const mytemplate = `
      <html>
          <body>
            <div>
              <div width: 500px;>
                <h1>${name}님 가입을 환영합니다!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>전화번호: ${phone}</div>
                <div>좋아하는 사이트: ${url}</div>
                <div style="color: red; font-weight: 700">가입일: ${getToday()}</div>
              </div>
            </div>
          </body>
      </html>`;

  return mytemplate;
};

export const sendTemplate = async (email, template) => {
  // console.log(`${email}주소로 가입환영 템플릿을 보냅니다.${template}`);
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_USER;

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
