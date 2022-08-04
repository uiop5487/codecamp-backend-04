import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { PointCharge } from './entities/pointCharge.entity';
import { PointChargeService } from './pointCharge.service';

@Resolver()
export class PointChargeResolver {
  constructor(private readonly pointsTransctionsService: PointChargeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointCharge)
  createPointCharge(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;

    return this.pointsTransctionsService.create({ impUid, amount, user });
  }
}
