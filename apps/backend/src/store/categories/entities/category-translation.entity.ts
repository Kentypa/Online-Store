import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Language } from "src/shared/entities/language.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Index(["category", "language"])
export class CategoryTranslation {
  @ApiProperty({
    example: 13,
    description: "Category ID",
    type: "number",
  })
  @PrimaryColumn({ name: "category_id" })
  categoryId: number;

  @ApiProperty({
    example: "en",
    description: "Language code from standart",
    type: "string",
  })
  @PrimaryColumn({ name: "lang_code" })
  langCode: string;

  @ApiProperty({
    description: "Relationships with category column in database",
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.translations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  @Exclude()
  category: Category;

  @ApiProperty({
    description: "Relationships with language column in database",
    type: () => Language,
  })
  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  @Exclude()
  language: Language;

  @ApiProperty({
    example: "Electronics",
    description: "Category name on their original language",
    type: "string",
  })
  @Column({ length: 255 })
  name: string;
}
