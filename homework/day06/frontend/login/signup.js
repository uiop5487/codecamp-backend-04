// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;
  console.log(phone);
  const result = await axios.post("http://localhost:3000/tokens/phone", {
    phone: phone,
  });
  console.log("인증 번호 전송", result);
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;
  const name = document.getElementById("SignupName").value;
  const num = document.getElementById("SignupPersonal").value;
  const url = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const password = document.getElementById("SignupPwd").value;

  const result = await axios.post("http://localhost:3000/users", {
    user: {
      name,
      phone,
      url,
      email,
    },
  });

  console.log("회원 가입 이메일 전송", result);
};
