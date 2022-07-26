import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductSubType } from 'src/apis/productsSubType/entities/productSubType.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  unit: string;

  @Column()
  @Field(() => String)
  volume: string;

  @Column()
  @Field(() => String)
  origin: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isBest: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isNew: boolean;

  // @Column()
  // @Field(() => Date)
  // createdAt: Date;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  subCategory: ProductSubCategory;

  @ManyToOne(() => ProductSubType)
  @Field(() => ProductSubType)
  subType: ProductSubType;

  @JoinTable()
  @ManyToMany(() => ProductTag, (ProductTag) => ProductTag.products)
  @Field(() => [ProductTag])
  tags: ProductTag[];

  @ManyToOne(() => Seller)
  @Field(() => Seller)
  seller: Seller;
}
