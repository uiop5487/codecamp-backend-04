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

export const sendTokenToSMS = (phone, result) => {
  console.log(`${phone}번호로 인증번호${result}을 전송합니다.`);
};
