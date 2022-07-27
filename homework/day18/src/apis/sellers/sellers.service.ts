import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerServices {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findAll() {
    return this.sellerRepository.find();
  }

  async findOne({ sellerId }) {
    return this.sellerRepository.findOne({
      where: { id: sellerId },
    });
  }

  async create({ createSellerInput }) {
    const result = await this.sellerRepository.save({
      ...createSellerInput,
    });
    console.log(result);
    return result;
  }
}
