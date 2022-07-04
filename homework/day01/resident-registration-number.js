export const checkValidation = (num) => {
  const arr1 = num.split("-");
  const arr2 = num.split("");
  if (arr2[6] !== "-") {
    console.log("형식이 올바르지 않습니다!!");
    return false;
  } else if (arr1[0].length !== 6 || arr1[1].length !== 7) {
    console.log("개수를 제대로 입력해주세요!!");
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
