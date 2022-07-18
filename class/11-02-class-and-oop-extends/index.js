const date = new Date();

console.log("연도", date.getFullYear());
console.log("달", date.getMonth() + 1);

class Monster {
  power = 10;

  constructor(aaa) {
    this.power = aaa;
  }

  attack = () => {
    console.log("공격!");
    console.log(`내 공격력은 ${this.power}`);
  };

  // run = () => {
  //   console.log("도망가!");
  // };
}

class SkyMonster extends Monster {
  constructor(qqq) {
    super(qqq);
  }

  run = () => {
    console.log("날라서 도망가자");
  };
}

class GrounMoster extends Monster {
  constructor(www) {
    super(www);
  }

  run = () => {
    console.log("뛰어서 도망가자");
  };
}

const monster1 = new SkyMonster(20);
monster1.attack();
monster1.run();

const monster2 = new GrounMoster(50);
monster2.attack();
monster2.run();
