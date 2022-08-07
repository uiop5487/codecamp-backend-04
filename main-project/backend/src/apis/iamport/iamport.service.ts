import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import {
  PointCharge,
  POINT_TRANSACTION_STATUS_ENUM,
} from '../pointCharge/entities/pointCharge.entity';

@Injectable()
export class IamportService {
  constructor(
    @InjectRepository(PointCharge)
    private readonly pointChargeRepository: Repository<PointCharge>, //
  ) {}

  async createrIamportAccessToken() {
    const result = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '5018380331276616', // REST API키
        imp_secret:
          'OwFWjlrvKNC04pL4SobwG7bJs5ZtBquY7Zr07BD9JgmfbzeZzmRmK2bDknAptqJjiLfjPW6AaW3ircwy', // REST API Secret
      },
    });

    return result.data.response.access_token;
  }

  async checkPayment({ token, impUid }) {
    console.log(impUid);
    const result = axios
      .get(`https://api.iamport.kr/payments/${impUid}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 발행된 액세스 토큰
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data.message;
      });

    return result;
  }

  async cancelPayment({ impUid, token, user }) {
    const result = await this.checkPayment({ token, impUid });
    console.log(result.data.response.amount);

    const getCancelData = axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        Authorization: token, // 아임포트 서버로부터 발급받은 엑세스 토큰
      },
      data: {
        reason: '아무이유 없음', // 가맹점 클라이언트로부터 받은 환불사유
        imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
        amount: result.data.response.amount, // 가맹점 클라이언트로부터 받은 환불금액
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    console.log(getCancelData);

    const payment = await this.pointChargeRepository.findOne({
      where: { impUid: impUid },
    });

    return this.pointChargeRepository.save({
      price: -payment.price,
      impUid: payment.impUid,
      user: user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }
}
