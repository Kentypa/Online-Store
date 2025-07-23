import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { City } from "./city.entity";
import { Language } from "../../shared/entities/language.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CityTranslation {
  @ApiProperty({
    example: 13,
    description: "City ID",
    type: "number",
  })
  @PrimaryColumn()
  city_id: number;

  @ApiProperty({
    description: "City column in database",
    type: () => City,
  })
  @ManyToOne(() => City, (city) => city.translations)
  @JoinColumn({ name: "city_id" })
  @Exclude()
  city: City;

  @ApiProperty({
    description: "Language column in database",
    type: () => Language,
  })
  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @ApiProperty({
    example: "en",
    description: "Language code from standart",
    type: "string",
  })
  @PrimaryColumn()
  lang_code: string;

  @ApiProperty({
    example: "Kropivnitskii",
    description: "City name",
    type: "string",
  })
  @Column()
  name: string;
}
