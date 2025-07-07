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

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country, (country) => country.regions)
  @JoinColumn({ name: "country_code" })
  country: Country;

  @Column()
  country_code: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => RegionTranslation, (t) => t.region)
  translations: RegionTranslation[];

  @OneToMany(() => City, (city) => city.region)
  cities: City[];
}
