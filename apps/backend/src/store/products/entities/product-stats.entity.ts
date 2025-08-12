import { Region } from "src/geo/entities/region.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ProductStats {
  @ApiProperty({
    example: 13,
    description: "Product stats ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Product stats relationships in database",
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.stats, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ApiProperty({
    example: 13,
    description: "Product ID",
    type: "number",
  })
  @Column({ name: "product_id" })
  productId: number;

  @ApiProperty({
    description: "Relationships in database with region column",
    type: () => Region,
  })
  @ManyToOne(() => Region, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "region_id" })
  region: Region;

  @ApiProperty({
    example: 13,
    description: "Region ID",
    type: "number",
  })
  @Column({ name: "region_id" })
  regionId: number;

  @ApiProperty({
    example: 13,
    description: "Product total solds",
    type: "number",
  })
  @Column({ type: "integer", default: 0, name: "total_sold" })
  totalSold: number;

  @ApiProperty({
    example: "ALL_WEEK",
    description: "Period type code",
    type: "string",
  })
  @Column({ type: "varchar", length: 20, name: "period_type_code" })
  periodTypeCode: string;

  @ApiProperty({
    description: "Period date",
    type: () => Date,
  })
  @Column({ type: "date", name: "period_date" })
  periodDate: Date;
}
