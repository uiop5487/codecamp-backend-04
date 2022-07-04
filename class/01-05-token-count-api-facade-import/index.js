import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

const createTokenOfPhone = (phone) => {
  // 1. 휴대폰 번호 자릿수 확인
  const isValid = checkValidationPhone(phone);
  if (!isValid) return;
  // 2. 핸드폰 토큰 6자리 만들기
  const token = getToken();
  // 3. 핸드폰번호에 토큰 전송
  sendTokenToSMS(phone, token);
};

createTokenOfPhone("01012345678");
