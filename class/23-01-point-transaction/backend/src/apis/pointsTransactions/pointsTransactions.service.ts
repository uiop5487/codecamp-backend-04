import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entites/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, user: _user }) {
    // 1. 포인트 테이블에 거래기록 생성
    const pointTransaction = this.pointsTransactionsRepository.save({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    // 2. 유저의 돈 찾아오기
    const user = await this.userRepository.findOne({
      where: _user.id,
    });

    // 3. 유저의 돈 업데이트
    this.userRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 프론트엔드에 돌려주기
    return pointTransaction;
  }
}
