import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { Language } from "src/shared/entities/language.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ProductTranslation {
  @ApiProperty({
    example: 13,
    description: "Product ID",
    type: "number",
  })
  @PrimaryColumn({ type: "integer", name: "product_id" })
  productId: number;

  @ApiProperty({
    example: "en",
    description: "Language code from standart",
    type: "string",
  })
  @PrimaryColumn({ type: "varchar", length: 2 })
  lang: string;

  @ApiProperty({
    description: "Relationships at database with product column",
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ApiProperty({
    description: "Relationships at database with language column",
    type: () => Language,
  })
  @ManyToOne(() => Language, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lang", referencedColumnName: "code" })
  language: Language;

  @ApiProperty({
    example: "SaltyProduct",
    description: "Product title",
    type: "string",
  })
  @Column({ type: "varchar", length: 128 })
  title: string;

  @ApiProperty({
    example: "Nice product with cool properties",
    description: "Product description",
    type: "string",
  })
  @Column({ type: "text" })
  description: string;

  @ApiProperty({
    description: "Search vector",
    type: "number",
  })
  @Column({ type: "tsvector", nullable: true, name: "search_vector" })
  @Exclude()
  searchVector: string;
}
