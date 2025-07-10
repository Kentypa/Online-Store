import { Region } from "src/geo/entities/region.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductStats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.stats, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "product_id" })
  product_id: number;

  @ManyToOne(() => Region, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "region_id" })
  region: Region;

  @Column({ name: "region_id" })
  region_id: number;

  @Column({ type: "integer", default: 0 })
  total_sold: number;

  @Column({ type: "varchar", length: 20 })
  period_type_code: string;

  @Column({ type: "date" })
  period_date: Date;
}
