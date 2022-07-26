import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductServices {
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
    });
    console.log(result);
    return result;
  }

  async update({ productId, updateProductInput }) {
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
  }
}
