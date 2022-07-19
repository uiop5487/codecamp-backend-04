// public, private, protected
// readonly, readonly, readonly

// 1. public
// class Aaa1 {
//   constructor(public mypower) {
//     // this.mypower = mypower; // public, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 가능
//   }
// }

// const aaa = new Aaa2(50);
// console.log(aaa.mypower); // 밖에서 접근 가능
// aaa.mypower = 10; // 밖에서 수정 가능

//
//
//
//
// 2. protected
// class Aaa1 {
//   constructor(protected mypower) {
//     // this.mypower = mypower; // public, protected, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 가능
//   }
// }

// const aaa = new Aaa2(50);
// console.log(aaa.mypower); // 밖에서 접근 불가
// aaa.mypower = 10; // 밖에서 수정 불가

//
//
//
//
// 3. private
// class Aaa1 {
//   constructor(private mypower) {
//     // this.mypower = mypower; // public, protected, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 불가
//     this.mypower = 10; // 자식이 수정 불가
//   }
// }

// const aaa = new Aaa2(50);
// console.log(aaa.mypower); // 밖에서 접근 불가
// aaa.mypower = 10; // 밖에서 수정 불가

//
//
//
//
// 4. readonly
// class Aaa1 {
//   constructor(readonly mypower) {
//     // this.mypower = mypower; // public, protected, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 불가
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 불가
//   }
// }

// const aaa = new Aaa2(50);
// console.log(aaa.mypower); // 밖에서 접근 가능
// aaa.mypower = 10; // 밖에서 수정 불가
