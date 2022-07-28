import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  async create({ email, password, name, age }) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    return this.usersRepository.save({ email, password, name, age });
  }
}
