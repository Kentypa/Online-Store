import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { Language } from "src/shared/entities/language.entity";

@Entity()
export class ProductTranslation {
  @PrimaryColumn({ type: "integer" })
  product_id: number;

  @PrimaryColumn({ type: "varchar", length: 2 })
  lang: string;

  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Language, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lang", referencedColumnName: "code" })
  language: Language;

  @Column({ type: "varchar", length: 128 })
  title: string;

  @Column({ type: "text" })
  description: string;
}
