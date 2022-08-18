import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { UsersService } from '../users.service';

class MockUsersRepository {
  mydb = [
    {
      email: 'asd@asd.com',
      password: '1234',
      name: '김진성',
      age: 24,
    },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get(UsersService);
  });

  // describe('findOne', () => {
  //   usersService.findOne() 테스트
  // });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기', async () => {
      const myData = {
        email: 'asd@asd.com',
        hashedPassword: '1234',
        name: '김진성',
        age: 24,
      };
      try {
        await usersService.create({ ...myData });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록 잘됐는지 검증', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '김진성',
        age: 24,
      };
      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'a@a.com',
        password: '1234',
        name: '김진성',
        age: 24,
      });
    });
  });
});
