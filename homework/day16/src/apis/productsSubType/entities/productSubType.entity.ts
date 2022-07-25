import { ProductMainType } from 'src/apis/productsMainType/entities/productMainType.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSubType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ProductMainType)
  maintype: ProductMainType;
}
