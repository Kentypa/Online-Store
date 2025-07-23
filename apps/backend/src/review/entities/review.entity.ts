import { ApiProperty } from "@nestjs/swagger";
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
} from "typeorm";

@Entity()
export class Review {
  @ApiProperty({
    example: 13,
    description: "Review ID",
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
    description: "Relationships with user column in database",
    type: "number",
  })
  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
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
    example: 13,
    description: "Relationships with product in database",
    type: "number",
  })
  @ManyToOne(() => Product, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ApiProperty({
    example: 3,
    description: "Rating for product at review",
    type: "number",
  })
  @Column({ type: "integer" })
  rating: number;

  @ApiProperty({
    example: "Nice product",
    description: "Commentary to product at review",
    type: "number",
  })
  @Column({ type: "text" })
  comment: string;

  @ApiProperty({
    description: "Created at date",
    type: () => Date,
  })
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty({
    description: "Updated at date",
    type: () => Date,
  })
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ApiProperty({
    description: "Deleted at date",
    type: () => Date,
  })
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date | null;
}
