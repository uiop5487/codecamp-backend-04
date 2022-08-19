// 1. 문자
const getString = (arg: string): string => {
  return arg;
};

const result1 = getString("철수");

// 2. 숫자
const getNumber = (arg: number): number => {
  return arg;
};

const result2 = getNumber(0);

// 3. any
const getAny = (arg: any): any => {
  return arg;
};

const result3 = getAny("철수");

const getAnyReverse = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  return [arg3, arg2, arg1];
};

const result34 = getAnyReverse("철수", "다람쥐초등하교", 8);

// 4. generic 타입
const getGeneric = <MyType>(arg: MyType): MyType => {
  return arg;
};

const result4 = getGeneric("string");

const getGenericReverse = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result42 = getGenericReverse<string, string, number>(
  "철수",
  "다람쥐초등하교",
  8
);
