import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { IamportService } from '../iamport/iamport.service';
import { PointCharge } from './entities/pointCharge.entity';
import { PointChargeService } from './pointCharge.service';

@Resolver()
export class PointChargeResolver {
  constructor(
    private readonly pointsTransctionsService: PointChargeService, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointCharge)
  async createPointCharge(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;

    const isPyment = await this.pointsTransctionsService.findPayment({
      impUid,
    });

    if (isPyment) throw new ConflictException('이미 결제된 내역입니다.');

    const token = await this.iamportService.createrIamportAccessToken();

    const isValid = await this.iamportService.checkPayment({ token, impUid });

    if (typeof isValid === 'string')
      throw new UnprocessableEntityException(isValid);

    return this.pointsTransctionsService.create({ impUid, amount, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointCharge)
  async cancelPoint(
    @Args('impUid') impUid: string, //
    @Context() context: IContext,
  ) {
    const result = await this.pointsTransctionsService.findPayment({ impUid });
    if (result.status === 'CANCEL')
      throw new UnprocessableEntityException('이미 환불되었습니다.');

    const user = context.req.user;

    const token = await this.iamportService.createrIamportAccessToken();

    return this.iamportService.cancelPayment({ impUid, token, user });
  }
}
