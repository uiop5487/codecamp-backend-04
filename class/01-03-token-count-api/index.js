const createTokenOfPhone = (phone) => {
  // 1. 휴대폰 번호 자릿수 확인
  if (phone.length !== 10 && phone.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요!!");
    return;
  }
  // 2. 핸드폰 토큰 6자리 만들기
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

  // 3. 핸드폰번호에 토큰 전송

  console.log(`${phone}번호로 인증번호${result}을 전송합니다.`);
};

createTokenOfPhone("01012345678");
