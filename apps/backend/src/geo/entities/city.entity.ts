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
import { Exclude } from "class-transformer";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Region, (region) => region.cities)
  @JoinColumn({ name: "region_id" })
  region: Region;

  @Column()
  region_id: number;

  @OneToMany(() => CityTranslation, (t) => t.city)
  translations: CityTranslation[];
}
