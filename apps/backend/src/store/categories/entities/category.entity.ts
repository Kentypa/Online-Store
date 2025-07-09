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

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent: Category;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  image_url: string;

  @OneToMany(() => CategoryTranslation, (translation) => translation.category)
  @Exclude()
  translations: CategoryTranslation[];

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
