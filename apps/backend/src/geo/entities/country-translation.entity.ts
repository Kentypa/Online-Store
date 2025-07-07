import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from "typeorm";
import { Country } from "./country.entity";
import { Language } from "./language.entity";

@Entity()
export class CountryTranslation {
  @ManyToOne(() => Country, (country) => country.translations)
  @JoinColumn({ name: "country_code" })
  country: Country;

  @PrimaryColumn()
  country_code: string;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @PrimaryColumn()
  lang_code: string;

  @Column()
  name: string;
}
