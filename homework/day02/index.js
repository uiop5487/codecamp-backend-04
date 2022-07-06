import {
  changeNumber,
  checkValidation,
  getWelcomeTemplate,
  sendTemplate,
} from "./template.js";

const createUser = ({ name, email, num, phoneNum, url }) => {
  // 1. 주민번호 이메일 검증
  const isValid = checkValidation(num, email);
  if (!isValid) return;
  // 2. 주민번호 변환
  const changeNum = changeNumber(num);
  // 3. 템플릿 생성
  const template = getWelcomeTemplate({
    name,
    email,
    changeNum,
    phoneNum,
    url,
  });
  // 4. 템플릿 보내기
  console.log(sendTemplate(template));
};

const name = "김진성";
const email = "asd@asd.com";
const num = "123456-1234572";
const phoneNum = "010-1234-5678";
const url = "asdqwezxc.com";

createUser({ name, email, num, phoneNum, url });
