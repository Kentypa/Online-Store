import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { UserRefreshToken } from "./user-refresh-tokens.entity";
import { Language } from "src/geo/entities/language.entity";
import { Country } from "src/geo/entities/country.entity";
import { Region } from "src/geo/entities/region.entity";
import { City } from "src/geo/entities/city.entity";

@Entity()
export class User {
  @ApiProperty({
    example: "12",
    description: "User ID",
    type: "number",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  @Column({ type: "varchar", length: 320, unique: true })
  email: string;

  @ApiProperty({
    example: "Igor",
    description: "User firstname",
    type: "string",
  })
  @Column({ type: "varchar", length: 64, nullable: true })
  firstName: string;

  @ApiProperty({
    example: "Voitenko",
    description: "User lastname",
    type: "string",
  })
  @Column({ type: "varchar", length: 64, nullable: true })
  lastName: string;

  @ApiProperty({
    example: "+88005553535",
    description: "User phone number",
    type: "string",
  })
  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @ApiProperty({
    example: "qwerty1234",
    description: "User password",
    type: "string",
  })
  @Column({ type: "varchar", length: 512 })
  @Exclude()
  password: string;

  @ApiProperty({
    example: "uploads/users/avatars/1748361610393-2ee0737ab7ef.gif",
    description: "Path to user avatar",
    type: "string",
  })
  @Column({ type: "varchar", length: 512, nullable: true })
  avatarUrl: string;

  @ManyToOne(() => Language, (language) => language.code)
  language: Language;

  @ManyToOne(() => Country, (country) => country.code)
  country: Country;

  @ManyToOne(() => Region, (region) => region.id)
  region: Region;

  @ManyToOne(() => City, (city) => city.id)
  city: City;

  @OneToMany(() => UserRefreshToken, (token) => token.user, {
    cascade: true,
  })
  refreshTokens: UserRefreshToken[];

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user creating",
    type: Date,
  })
  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user data latest updates",
    type: Date,
  })
  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ApiProperty({
    example: "2025-05-27 15:23:48.941416",
    description: "Date of user data deleted",
    type: Date,
    required: false,
  })
  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
