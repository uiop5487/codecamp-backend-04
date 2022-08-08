import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly connection: Connection, //
  ) {}

  async create({ impUid, amount, user: _user }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    // ====================== 트랜잭션 시작 ======================
    await queryRunner.startTransaction();
    // ========================================================

    try {
      // 1. 포인트 테이블에 거래기록 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트
      // const updatedUser =  this.userRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // ====================== 커밋 ======================
      await queryRunner.commitTransaction();
      // =================================================

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // ====================== 롤백 ======================
      await queryRunner.rollbackTransaction();
      // =================================================
      throw new Error(error);
    } finally {
      // ====================== 연결해제 ======================
      await queryRunner.release();
      // ====================================================
    }
  }
}
