import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Language {
  @ApiProperty({
    example: "en",
    description: "Language code from standart",
    type: "string",
  })
  @PrimaryColumn()
  code: string;

  @ApiProperty({
    example: "United Kingdom",
    description: "Name of language on English",
    type: "string",
  })
  @Column()
  name: string;
}
