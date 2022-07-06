// 1. shorthand property
function qqq(aaa) {
  console.log(aaa.name);
  console.log(aaa.age);
  console.log(aaa.school);
}

const name = "철수";
const age = 13;
const school = "다람쥐초등학교";
const profile = {
  naem: name,
  age: age,
  school: school,
};

qqq({ name, age, school });

// 2. destructuring
function qqq({ apple, banana }) {
  // const { apple, banana } = basket
}

const basket = {
  apple: 3,
  banana: 10,
};
qqq(basket);
