import { getToday } from "./utils.js";

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

export const getWelcomeTemplate = ({ name, age, school, email }) => {
  const mytemplate = `
      <html>
          <body>
              <h1>${name}님 가입을 환영합니다!!</h1>
              <hr />
              <div>이메일: ${email}</div>
              <div>이름: ${name}</div>
              <div>나이: ${age}살</div>
              <div>학교: ${school}</div>
              <div>가입일: ${getToday()}</div>
          </body>
      </html>`;

  return mytemplate;
};

export const sendTemplate = (email, template) => {
  return `${email}주소로 가입환영 템플릿을 보냅니다.${template}`;
};
