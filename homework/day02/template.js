export const checkValidation = (num, email) => {
  const arr1 = num.split("-");
  const arr2 = num.split("");
  if (arr2[6] !== "-") {
    console.log("주민번호 형식이 올바르지 않습니다!!");
    return false;
  } else if (arr1[0].length !== 6 || arr1[1].length !== 7) {
    console.log("주민번호 개수를 제대로 입력해주세요!!");
    return false;
  }
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

export const changeNumber = (num) => {
  return num.split("").reduce((acc, cur, i) => {
    if (i > 7) return acc + "*";
    return acc + cur;
  });
};

export const getWelcomeTemplate = ({
  name,
  email,
  changeNum,
  phoneNum,
  url,
}) => {
  const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!</h1>
                <hr />
                <div>이메일: ${email}</div>
                <div>주민번호: ${changeNum}</div>
                <div>휴대폰 번호: ${phoneNum}</div>
                <div>내가 좋아하는 사이트: ${url}</div>
            </body>
        </html>`;

  return mytemplate;
};

export const sendTemplate = (template) => {
  return template;
};
