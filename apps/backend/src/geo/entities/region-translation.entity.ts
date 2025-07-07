import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Region } from "./region.entity";
import { Language } from "./language.entity";
import { Exclude } from "class-transformer";

@Entity()
export class RegionTranslation {
  @PrimaryColumn()
  region_id: number;

  @ManyToOne(() => Region, (region) => region.translations)
  @JoinColumn({ name: "region_id" })
  @Exclude()
  region: Region;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @PrimaryColumn()
  lang_code: string;

  @Column()
  name: string;
}
