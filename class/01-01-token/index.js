console.log("안녕하세요!");

// 6자리만 나오는 토큰
// const getToken = () => {
//   const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
//   console.log(result);
//   return result;
// };

// getToken();

// 인자로 받는 갯수 만큼에 자릿수가 나오는 토큰
const getToken = (num) => {
  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );
  console.log(result);
  return result;
};

getToken(3);
