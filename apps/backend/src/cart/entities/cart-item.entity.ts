import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "src/shared/entities/user.entity";
import { Product } from "src/store/products/entities/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";

@Entity()
@Index(["user_id", "product_id"], { unique: true })
export class CartItem {
  @ApiProperty({
    example: 13,
    description: "Cart item ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 13,
    description: "User ID",
    type: "number",
  })
  @Column({ type: "integer" })
  user_id: number;

  @ApiProperty({
    description: "Relationships with user column",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.cart, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ApiProperty({
    example: 13,
    description: "Product ID",
    type: "number",
  })
  @Column({ type: "integer" })
  product_id: number;

  @ApiProperty({
    description: "Relationships with product table",
    type: () => Product,
  })
  @ManyToOne(() => Product, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ApiProperty({
    example: 13,
    description: "Quantity of cart item",
    type: "number",
  })
  @Column({ type: "integer", default: 1 })
  quantity: number;

  @ApiProperty({
    description: "Created at date",
    type: () => Date,
  })
  @CreateDateColumn({ name: "created_at" })
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    description: "Updated at date",
    type: () => Date,
  })
  @UpdateDateColumn({ name: "updated_at" })
  @Exclude()
  updatedAt: Date;

  @ApiProperty({
    description: "Deleted at date",
    type: () => Date,
  })
  @DeleteDateColumn({ name: "deleted_at" })
  @Exclude()
  deletedAt: Date | null;
}
