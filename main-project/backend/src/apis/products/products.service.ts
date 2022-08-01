import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private readonly prdouctRepository: Repository<Product>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return this.prdouctRepository.find({
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
      ],
    });
  }

  async findOne({ prodcutId }) {
    return this.prdouctRepository.findOne({
      where: { id: prodcutId },
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
      ],
    });
  }

  findWithDeleted() {
    return this.prdouctRepository.find({
      withDeleted: true,
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
      ],
    });
  }

  async create({ createProductInput }) {
    const { productCategoryId, productTypeId, sellerId, tags, ...product } =
      createProductInput;

    const productTags = [];

    for (let i = 0; i < tags.length; i++) {
      const newTag = tags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tags[i] },
      });

      if (prevTag) {
        productTags.push(prevTag);
      } else {
        const aaa = await this.productTagRepository.save({ name: newTag });
        productTags.push(aaa);
      }
    }

    const result2 = await this.prdouctRepository.save({
      ...product,
      seller: { id: sellerId },
      category: { id: productCategoryId },
      type: { id: productTypeId },
      tags: productTags,
    });

    return result2;
  }

  async update({ productId, updateProductInput }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    const result = this.prdouctRepository.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldOut({ productId }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    const result = await this.prdouctRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const retoreResopnse = await this.prdouctRepository.restore(productId);
    return retoreResopnse.affected ? true : false;
  }
}
