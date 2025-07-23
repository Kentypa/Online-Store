import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { CountryTranslation } from "./country-translation.entity";
import { Region } from "./region.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Country {
  @ApiProperty({
    example: "GB",
    description: "Country code",
    type: "string",
  })
  @PrimaryColumn()
  code: string;

  @ApiProperty({
    description: "Translations of language on differents languages",
    type: "number",
  })
  @OneToMany(() => CountryTranslation, (t) => t.country)
  translations: () => CountryTranslation[];

  @ApiProperty({
    description: "Relationships with relevant regions",
    type: "number",
  })
  @OneToMany(() => Region, (region) => region.country)
  regions: () => Region[];
}
