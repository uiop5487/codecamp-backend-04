import {
  checkValidation,
  changeNumber,
} from "./resident-registration-number.js";

const customRegistrationNumber = (num) => {
  const isValid = checkValidation(num);
  if (!isValid) return;
  console.log(changeNumber(num));
};

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101”");
customRegistrationNumber("2105101010101");
