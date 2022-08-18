import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductServices } from './products.service';

@Resolver()
export class ProductResolvers {
  constructor(
    private readonly productService: ProductServices, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱서치에서 조회하기 연습(연습 이후에는 다시 삭제)
    const result = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, '  '));

    // 엘라스틱서치에서 조회해보기 위해 임시로 주석
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') prodcutId: string, //
  ) {
    return this.productService.findOne({ prodcutId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // 엘라스틱서치에 등록하기 연습(연습 이후에는 다시 삭제)
    // this.elasticsearchService.create({
    //   index: 'myproduct04',
    //   id: 'id',
    //   document: {
    //     name: '철수',
    //     age: 12,
    //     school: '다람쥐 초등학교',
    //     ...createProductInput,
    //   },
    // });

    // 엘라스틱서치에 등록해보기 위해 임시로 주석
    return this.productService.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 여부 확인
    await this.productService.checkSoldOut({ productId });

    // 수정
    return this.productService.update({ productId, updateProductInput });
  }
  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
