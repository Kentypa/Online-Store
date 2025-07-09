import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { City } from "./city.entity";
import { Language } from "../../shared/entities/language.entity";
import { Exclude } from "class-transformer";

@Entity()
export class CityTranslation {
  @PrimaryColumn()
  city_id: number;

  @ManyToOne(() => City, (city) => city.translations)
  @JoinColumn({ name: "city_id" })
  @Exclude()
  city: City;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @PrimaryColumn()
  lang_code: string;

  @Column()
  name: string;
}
