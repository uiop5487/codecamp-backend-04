import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  findAll() {
    const result = [
      {
        name: '아메리카노',
        price: 1000,
        kcal: 1000,
        fat: 1000,
        protein: 1000,
        salt: 1000,
        sugars: 1000,
        caffeine: 1000,
      },
      {
        name: '캐모마일',
        price: 1111,
        kcal: 1322,
        fat: 102,
        protein: 400,
        salt: 5000,
        sugars: 1000,
        caffeine: 4000,
      },
      {
        name: '레몬에이드',
        price: 111,
        kcal: 132,
        fat: 111,
        protein: 221,
        salt: 5560,
        sugars: 1500,
        caffeine: 88,
      },
      {
        name: '자몽에이드',
        price: 12341,
        kcal: 4432,
        fat: 1232,
        protein: 4352,
        salt: 66,
        sugars: 111,
        caffeine: 3434,
      },
      {
        name: '카페라떼',
        price: 123,
        kcal: 5654,
        fat: 8855,
        protein: 345,
        salt: 754,
        sugars: 564,
        caffeine: 235,
      },
    ];
    return result;
  }

  create({ createStarbucksInput }) {
    console.log(createStarbucksInput);
    return '게시물 등록에 성공하였슴!';
  }
}
