import coolsms from "coolsms-node-sdk";
import "dotenv/config";

export const checkValidationPhone = (phone) => {
  if (phone.length !== 10 && phone.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요!!");
    return false;
  }
  return true;
};

export const getToken = () => {
  const num = 6;
  if (num === undefined) {
    console.log("갯수를 제대로 입력해주세요!!");
    return;
  } else if (num <= 0) {
    console.log("갯수가 0보다 작습니다!!");
    return;
  } else if (num > 10) {
    console.log("갯수가 너무 많습니다!!");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );

  return result;
};

export const sendTokenToSMS = async (phone, result) => {
  const mysms = coolsms.default;

  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const response = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `인증번호는 ${result}입니다.`,
  });

  console.log(response);
};
