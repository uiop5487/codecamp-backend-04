import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplate,
} from "./email.js";

const createUser = ({ name, age, school, email }) => {
  // 1. 이메일 확인
  const isValid = checkValidationEmail(email);
  if (!isValid) return;
  // 2. 가입환형 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school, email });
  // 3. 이메일에 가입환영 템플릿 전송
  console.log(sendTemplate(email, template));
};

const name = "철수";
const age = 6;
const school = "토끼초등학교";
const email = "asd@asd.com";

createUser({ name, age, school, email });
