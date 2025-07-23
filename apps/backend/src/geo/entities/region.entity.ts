import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Country } from "./country.entity";
import { RegionTranslation } from "./region-translation.entity";
import { City } from "./city.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Region {
  @ApiProperty({
    example: 13,
    description: "Region ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Country relationship",
    type: () => Country,
  })
  @ManyToOne(() => Country, (country) => country.regions)
  @JoinColumn({ name: "country_code" })
  country: Country;

  @ApiProperty({
    example: "GB",
    description: "Country code",
    type: "string",
  })
  @Column()
  country_code: string;

  @ApiProperty({
    example: "Lvivska Oblast",
    description: "Region code",
    type: "string",
  })
  @Column({ unique: true })
  code: string;

  @ApiProperty({
    description: "Translation relationships",
    type: () => [RegionTranslation],
  })
  @OneToMany(() => RegionTranslation, (t) => t.region)
  translations: RegionTranslation[];

  @ApiProperty({
    description: "City relationships",
    type: () => [City],
  })
  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
