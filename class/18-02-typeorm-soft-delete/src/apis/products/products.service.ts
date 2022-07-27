import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositoy: Repository<Product>,
  ) {}

  async findAll() {
    return this.productRepositoy.find();
  }

  async findOne({ prodcutId }) {
    return this.productRepositoy.findOne({
      where: { id: prodcutId },
    });
  }

  async create({ createProductInput }) {
    const result = await this.productRepositoy.save({
      ...createProductInput,

      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    console.log(result);
    return result;
  }

  async update({ productId, updateProductInput }) {
    // 단순 수정만 할 때 사용
    // this.productRepositoy.update({ id: productId }, { ...updateProductInput });

    // 수정하고 결과값을 받아 리턴할 때 사용
    const product = await this.productRepositoy.findOne({
      where: { id: productId },
    });

    const result = this.productRepositoy.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldOut({ productId }) {
    const product = await this.productRepositoy.findOne({
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
    // const result = await this.productRepositoy.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현)
    // this.productRepositoy.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepositoy.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRepositoy.softRemove({ id: productId }); // 아이디로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepositoy.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }
}
