import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryTranslation } from "./category-translation.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Category {
  @ApiProperty({
    example: 13,
    description: "Category ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Relationships with category column in database",
    type: () => Category,
  })
  @ManyToOne(() => Category, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent: Category;

  @ApiProperty({
    example: 13,
    description: "Parent category ID",
    type: "number",
  })
  @Column({ nullable: true, name: "parent_id" })
  parentId: number;

  @ApiProperty({
    example: "/public/products/images/electronics.svg",
    description: "URL to category image",
    type: "string",
  })
  @Column({ nullable: true, name: "image_url" })
  imageUrl: string;

  @ApiProperty({
    description: "Relationships with category translations in database",
    type: () => CategoryTranslation,
  })
  @OneToMany(() => CategoryTranslation, (translation) => translation.category)
  @Exclude()
  translations: CategoryTranslation[];

  @ApiProperty({
    description: "Deleted at date",
    type: () => Date,
  })
  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
