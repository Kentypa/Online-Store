import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Region } from "./region.entity";
import { CityTranslation } from "./city-translation.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class City {
  @ApiProperty({
    example: 13,
    description: "City ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 13,
    description: "Region ID",
    type: "number",
  })
  @Column({ name: "region_id" })
  regionId: number;

  @ApiProperty({
    description: "Region this city belongs to",
    type: () => Region,
  })
  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: "region_id" })
  region: Region;

  @ApiProperty({
    description: "Translations of the city name into different languages",
    type: () => [CityTranslation],
  })
  @OneToMany(() => CityTranslation, (t) => t.city)
  translations: CityTranslation[];
}
