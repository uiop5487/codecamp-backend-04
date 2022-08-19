interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// type AAA = {
//   name: string;
//   age: number;
//   school: string;
//   hooby?: string;
// };

// // 선언병합
// interface IProfile {
//   apple: number;
// }

//
//
// 1. Partial 타입
// 다 있어도 되고 없어도 된다는 의미
type MyType1 = Partial<IProfile>;

// 2. Required 타입
// 모두 필수로 들어와야 되는 타입
type MyType2 = Required<IProfile>;

// 3. Pick 타입
// 원하는것만 뽑아서 쓸수있는 타입
type MyType3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
// 적어준것을 제외하고 가져옴
type MyType4 = Omit<IProfile, "school">;

// 5. Record 타입
type ZZZ = "aaa" | "qqq" | "rrr"; // union 타입
type MyType5 = Record<ZZZ, string>;

// 만약 유니온 타입을 만들려면..?
// const zzz: ZZZ // "aaa" | "qqq" | "rrr"
// zzz === ''

// const qqq: keyof IProfile // "name" | "age" | "school" | "hobby"
// qqq === ''
