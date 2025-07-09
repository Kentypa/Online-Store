import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Language {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
