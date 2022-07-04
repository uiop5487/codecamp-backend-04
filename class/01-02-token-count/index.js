console.log("안녕하세요!");

const getToken = (num) => {
  if (num === undefined) {
    console.log("갯수를 제대로 입력해주세요!!");
    return;
  } else if (num <= 0) {
    console.log("갯수가 0보다 작습니다!!");
    return;
  } else if (num > 10) {
    console.log("개숫가 너무 많습니다!!");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );

  console.log(result);

  return result;
};

getToken();
