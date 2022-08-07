import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointCharge,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointCharge.entity';

@Injectable()
export class PointChargeService {
  constructor(
    @InjectRepository(PointCharge)
    private readonly pointsChargeRepository: Repository<PointCharge>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, user: _user }) {
    // 1. 포인트 테이블에 거래기록 생성
    const user = await this.userRepository.findOne({
      where: { id: _user.id },
    });

    console.log(_user);
    const pointTransaction = this.pointsChargeRepository.save({
      impUid,
      price: amount,
      user: user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    // 2. 유저의 돈 찾아오기

    // 3. 유저의 돈 업데이트
    this.userRepository.update(
      { id: _user.id },
      { point: Number(user.point) + Number(amount) },
    );

    // 4. 최종결과 프론트엔드에 돌려주기
    return pointTransaction;
  }

  async findPayment({ impUid }) {
    const result = await this.pointsChargeRepository.findOne({
      relations: ['user'],
      where: { impUid: impUid },
      order: { id: 'DESC' },
    });
    return result;
  }
}
