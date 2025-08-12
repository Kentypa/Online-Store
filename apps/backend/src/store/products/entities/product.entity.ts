import { Category } from "src/store/categories/entities/category.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ProductTranslation } from "./product-translation.entity";
import { ProductStats } from "./product-stats.entity";
import { Review } from "src/review/entities/review.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
  @ApiProperty({
    example: 13,
    description: "Product ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 133,
    description: "Product price",
    type: "number",
  })
  @Column({ type: "integer" })
  price: number;

  @ApiProperty({
    example: "USD",
    description: "Product currency",
    type: "string",
  })
  @Column({ type: "varchar", length: 3, default: "USD" })
  currency: string;

  @ApiProperty({
    example: 13,
    description: "Product stock",
    type: "number",
  })
  @Column({ type: "integer", default: 0 })
  stock: number;

  @ApiProperty({
    example: "/public/products/images/bebra.jpeg",
    description: "Path to main image url",
    type: "string",
  })
  @Column({ type: "varchar", length: 256, name: "main_image_url" })
  mainImageUrl: string;

  @ApiProperty({
    example: [
      "/public/products/images/bebra.jpeg",
      "/public/products/images/bobr.jpeg",
    ],
    description: "Product other images",
    type: "string",
    isArray: true,
  })
  @Column({
    type: "text",
    array: true,
    nullable: true,
    name: "other_image_urls",
  })
  otherImageUrls: string[];

  @ApiProperty({
    description: "Relationships at database with category column",
    type: () => Category,
  })
  @ManyToOne(() => Category, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ApiProperty({
    example: 13,
    description: "Category ID",
    type: "number",
  })
  @Column({ type: "integer", name: "category_id" })
  categoryId: number;

  @ApiProperty({
    description: "Relationships with translations column in database",
    type: () => ProductTranslation,
    isArray: true,
  })
  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: true,
  })
  translations: ProductTranslation[];

  @ApiProperty({
    description: "Product stats",
    type: () => ProductStats,
    isArray: true,
  })
  @OneToMany(() => ProductStats, (stats) => stats.product)
  stats: ProductStats[];

  @ApiProperty({
    description: "Product reviews",
    type: () => Review,
    isArray: true,
  })
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ApiProperty({
    description: "Created at data",
    type: () => Date,
  })
  @CreateDateColumn({ name: "created_at" })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: "updated at data",
    type: () => Date,
  })
  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt: Date;

  @ApiProperty({
    description: "deleted at data",
    type: () => Date,
  })
  @DeleteDateColumn({ name: "deleted_at" })
  @Exclude()
  deletedAt: Date | null;
}
