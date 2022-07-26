import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prdouctRepositoy: Repository<Product>,
  ) {}

  async findAll() {
    return this.prdouctRepositoy.find();
  }

  async findOne({ prodcutId }) {
    return this.prdouctRepositoy.findOne({
      where: { id: prodcutId },
    });
  }

  async create({ createProductInput }) {
    const result = await this.prdouctRepositoy.save({
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
    // this.prdouctRepositoy.update({ id: productId }, { ...updateProductInput });

    // 수정하고 결과값을 받아 리턴할 때 사용
    const product = await this.prdouctRepositoy.findOne({
      where: { id: productId },
    });

    const result = this.prdouctRepositoy.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldOut({ productId }) {
    const product = await this.prdouctRepositoy.findOne({
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
}
