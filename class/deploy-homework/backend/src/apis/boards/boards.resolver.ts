import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String)
  // getHello(): string {
  //   return this.boardsService.getHello();
  // }
  @Query(() => [Board])
  fetchBoards() {
    return this.boardsService.findAll();
  }

  // @Mutation(() => String)
  // createBoard(
  //   @Args('writer') writer: string,
  //   @Args('title') title: string,
  //   @Args('contents') contents: string,
  // ) {
  //   return this.boardsService.create({ writer, title, contents });
  // }

  @Mutation(() => String)
  async createBoard(
    @Args({ name: 'createrBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0,
    });

    const myCache = await this.cacheManager.get('aaa');
    console.log(myCache);

    // 2. 캐시에서 조회하는 연습

    return '지금은 캐시 테스트 중';
    ///////////////////////////////////////////////////////////////////
    // 레디스 연습을 위한 주석
    // return this.boardsService.create({ createBoardInput });
  }
}
