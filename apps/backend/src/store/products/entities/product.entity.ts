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

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  price: number;

  @Column({ type: "varchar", length: 3, default: "USD" })
  currency: string;

  @Column({ type: "integer", default: 0 })
  stock: number;

  @Column({ type: "varchar", length: 256 })
  main_image_url: string;

  @Column({ type: "text", array: true, nullable: true })
  other_image_urls: string[];

  @ManyToOne(() => Category, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ type: "integer" })
  category_id: number;

  @OneToMany(() => ProductTranslation, (translation) => translation.product, {
    cascade: true,
  })
  translations: ProductTranslation[];

  @OneToMany(() => ProductStats, (stats) => stats.product)
  stats: ProductStats[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({ name: "created_at" })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Exclude()
  deletedAt: Date | null;
}
