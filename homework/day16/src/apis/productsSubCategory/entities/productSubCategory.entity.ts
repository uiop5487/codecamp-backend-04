import { ProductMainCategory } from 'src/apis/productsMainCategory/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ProductMainCategory)
  maincategory: ProductMainCategory;
}
