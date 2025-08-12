import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Region } from "./region.entity";
import { Language } from "../../shared/entities/language.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class RegionTranslation {
  @ApiProperty({
    example: 13,
    description: "Region ID",
    type: "number",
  })
  @PrimaryColumn({ name: "region_id" })
  regionId: number;

  @ApiProperty({
    description: "Relationships with region",
    type: () => Region,
  })
  @ManyToOne(() => Region, (region) => region.translations)
  @JoinColumn({ name: "region_id" })
  @Exclude()
  region: Region;

  @ApiProperty({
    description: "Relationships with language",
    type: () => Language,
  })
  @ManyToOne(() => Language)
  @JoinColumn({ name: "lang_code" })
  language: Language;

  @ApiProperty({
    example: "en",
    description: "Language code",
    type: "string",
  })
  @PrimaryColumn({ name: "lang_code" })
  langCode: string;

  @ApiProperty({
    example: "Lvivska oblast",
    description: "Name of region on differens name at other language",
    type: "string",
  })
  @Column()
  name: string;
}
