// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;

  const result = await axios.post("http://localhost:3000/tokens/phone", {
    phone: phone,
  });
  console.log(result);
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 완료");
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;
  const token = document.getElementById("TokenInput").value;

  const result = await axios.patch("http://localhost:3000/tokens/phone", {
    phone: phone,
    token: token,
  });

  console.log(result);
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const name = document.getElementById("SignupName").value;
  const personal1 = document.getElementById("SignupPersonal1").value;
  const personal2 = document.getElementById("SignupPersonal2").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;
  const phone = p1 + p2 + p3;
  const personal = `${personal1}-${personal2}`;

  const result = await axios.post("http://localhost:3000/users", {
    user: {
      name,
      pwd,
      email,
      personal,
      prefer,
      phone,
    },
  });
  console.log(result);
};
