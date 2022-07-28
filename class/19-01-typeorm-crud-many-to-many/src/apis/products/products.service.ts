import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesloacation } from '../productsSaleslocations/entities/productsSalesloaction.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSalesloacation)
    private readonly productSalesloacationRepository: Repository<ProductSalesloacation>,
  ) {}

  async findAll() {
    return this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async findOne({ prodcutId }) {
    return this.productRepository.findOne({
      where: { id: prodcutId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    // console.log(result);

    // 2. 상품과 상품거래위치 같이 등록
    const { productSalesloaction, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productSalesloacationRepository.save({
      ...productSalesloaction,
    });

    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: { id: productCategoryId },
    });

    return result2;
  }

  async update({ productId, updateProductInput }) {
    // 단순 수정만 할 때 사용
    // this.productRepository.update({ id: productId }, { ...updateProductInput });

    // 수정하고 결과값을 받아 리턴할 때 사용
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldOut({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );

    //   // throw new Error('이미 판매 완료된 상품입니다.');
    // }
  }

  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현)
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); // 아이디로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }
}
