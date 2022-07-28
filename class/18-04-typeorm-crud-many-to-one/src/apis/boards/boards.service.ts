import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  findAll() {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '1번 제목입니다.',
        contents: '1번 내용입니다.',
      },
      {
        number: 2,
        writer: '영희',
        title: '2번 제목입니다.',
        contents: '2번 내용입니다.',
      },
      {
        number: 3,
        writer: '훈이',
        title: '3번 제목입니다.',
        contents: '3번 내용입니다.',
      },
    ];
    return result;
  }

  create({ createBoardInput }) {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    return '게시물 등록에 성공하였슴!';
  }
}
