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

  run = () => {
    console.log("도망가!");
  };
}

const monster1 = new Monster(20);
monster1.attack();
monster1.run();

const monster2 = new Monster(50);
monster2.attack();
monster2.run();
