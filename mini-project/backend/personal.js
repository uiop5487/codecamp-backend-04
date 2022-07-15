export const changePersonal = (personal) => {
  return personal.split("").reduce((acc, cur, i) => {
    if (i >= 7) return acc + "*";
    return acc + cur;
  });
};
