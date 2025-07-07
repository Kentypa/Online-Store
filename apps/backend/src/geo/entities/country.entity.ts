import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { CountryTranslation } from "./country-translation.entity";
import { Region } from "./region.entity";

@Entity()
export class Country {
  @PrimaryColumn()
  code: string;

  @OneToMany(() => CountryTranslation, (t) => t.country)
  translations: CountryTranslation[];

  @OneToMany(() => Region, (region) => region.country)
  regions: Region[];
}
