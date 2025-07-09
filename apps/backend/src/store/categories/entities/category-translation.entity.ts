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

@Entity()
@Index(["category", "language"])
export class CategoryTranslation {
  @PrimaryColumn()
  category_id: number;

  @PrimaryColumn()
  lang_code: string;

  @ManyToOne(() => Category, (category) => category.translations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  @Exclude()
  category: Category;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  @Exclude()
  language: Language;

  @Column({ length: 255 })
  name: string;
}
