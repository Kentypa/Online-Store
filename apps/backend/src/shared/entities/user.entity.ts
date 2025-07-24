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
import { Language } from "src/shared/entities/language.entity";
import { Country } from "src/geo/entities/country.entity";
import { Region } from "src/geo/entities/region.entity";
import { City } from "src/geo/entities/city.entity";
import { PasswordResetToken } from "./user-password-reset-tokens.entity";
import { CartItem } from "src/cart/entities/cart-item.entity";

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

  @ApiProperty({
    description: "Relationships with language in database",
    type: () => Language,
  })
  @ManyToOne(() => Language, (language) => language.code)
  language: Language;

  @ApiProperty({
    description: "Relationships with country in database",
    type: () => Country,
  })
  @ManyToOne(() => Country, (country) => country.code)
  country: Country;

  @ApiProperty({
    description: "Relationships with region in database",
    type: () => Region,
  })
  @ManyToOne(() => Region, (region) => region.id)
  region: Region;

  @ApiProperty({
    description: "Relationships with city in database",
    type: () => City,
  })
  @ManyToOne(() => City, (city) => city.id)
  city: City;

  @ApiProperty({
    description: "Relationships with user refresh token in database",
    type: () => UserRefreshToken,
  })
  @OneToMany(() => UserRefreshToken, (token) => token.user, {
    cascade: true,
  })
  refreshTokens: UserRefreshToken[];

  @ApiProperty({
    description: "Relationships with password reset token column in database",
    type: () => PasswordResetToken,
  })
  @OneToMany(() => PasswordResetToken, (token) => token.user, {
    cascade: true,
  })
  passwordResetTokens: PasswordResetToken[];

  @ApiProperty({
    description: "Relationships with cart column in database",
    type: () => CartItem,
  })
  @OneToMany(() => CartItem, (cartItem) => cartItem.user, {
    cascade: true,
  })
  cart: CartItem[];

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
