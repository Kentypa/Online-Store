import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from "typeorm";
import { Country } from "./country.entity";
import { Language } from "../../shared/entities/language.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CountryTranslation {
  @ApiProperty({
    description: "Relationships countries",
    type: () => Country,
  })
  @ManyToOne(() => Country, (country) => country.translations)
  @JoinColumn({ name: "country_code" })
  country: Country;

  @ApiProperty({
    example: "GB",
    description: "Country code",
    type: "string",
  })
  @PrimaryColumn()
  country_code: string;

  @ApiProperty({
    description: "Language translation relationship",
    type: () => Language,
  })
  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @ApiProperty({
    example: "uk",
    description: "Language code",
    type: "string",
  })
  @PrimaryColumn()
  lang_code: string;

  @ApiProperty({
    example: "United Kingdom",
    description: "Country name",
    type: "string",
  })
  @Column()
  name: string;
}
