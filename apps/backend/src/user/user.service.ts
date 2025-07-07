import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../shared/entities/user.entity";
import { GetUserDto } from "./dto/get-user.dto";
import { EncryptionService } from "src/shared/services/encryption.service";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { Response } from "express";
import { CookieService } from "src/shared/services/cookie.service";
import { RecoveryUserDto } from "./dto/recovery-account.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as fs from "fs";
import * as path from "path";
import { Language } from "src/geo/entities/language.entity";
import { Country } from "src/geo/entities/country.entity";
import { Region } from "src/geo/entities/region.entity";
import { City } from "src/geo/entities/city.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private encryptionService: EncryptionService,
    private cookieService: CookieService,
    private dataSource: DataSource,
  ) {}

  async getSafeUser(id: number): Promise<GetUserDto> {
    return this.getById(id);
  }

  async recoveryUser(recoveryDataDto: RecoveryUserDto): Promise<void> {
    const { email, password } = recoveryDataDto;

    const user = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (user?.deletedAt === null) {
      throw new ForbiddenException("Account has been recovered or exists");
    }

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException("Passwords is not match");
    }

    await this.userRepository.restore(user.id);

    return;
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["language", "city", "country", "region"],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.getById(id);

    await this.userRepository.softRemove(user);
  }

  async update(id: number, dto: UpdateUserDto, avatar?: Express.Multer.File) {
    const user = await this.getById(id);

    if (dto.email) user.email = dto.email;
    if (dto.firstName) user.firstName = dto.firstName;
    if (dto.lastName) user.lastName = dto.lastName;
    if (dto.phoneNumber) user.phoneNumber = dto.phoneNumber;

    if (dto.oldPassword && dto.newPassword) {
      const isOldPasswordValid = await this.encryptionService.compare(
        dto.oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new BadRequestException("Incorrect old password");
      }
      user.password = await this.encryptionService.hashData(dto.newPassword);
    }

    if (dto.languageCode) {
      const language = await this.dataSource.getRepository(Language).findOne({
        where: { code: dto.languageCode },
      });
      if (!language) throw new NotFoundException("Language not found");
      user.language = language;
    }

    if (dto.countryCode) {
      const country = await this.dataSource.getRepository(Country).findOne({
        where: { code: dto.countryCode },
      });
      if (!country) throw new NotFoundException("Country not found");
      user.country = country;
    }

    if (dto.regionId) {
      const region = await this.dataSource.getRepository(Region).findOne({
        where: { id: Number(dto.regionId) },
      });
      if (!region) throw new NotFoundException("Region not found");
      user.region = region;
    }

    if (dto.cityId) {
      const city = await this.dataSource.getRepository(City).findOne({
        where: { id: Number(dto.cityId) },
      });
      if (!city) throw new NotFoundException("City not found");
      user.city = city;
    }

    if (avatar && avatar.path) {
      if (user.avatarUrl) {
        const oldPath = path.resolve(user.avatarUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      user.avatarUrl = avatar.path;
    }

    if (dto.avatarUrl) {
      user.avatarUrl = dto.avatarUrl;
    }

    return await this.userRepository.save(user);
  }

  async delete(id: number, dto: DeleteUserDto, response: Response) {
    const user = await this.getById(id);

    const { password, passwordRepeat } = dto;

    const passwordIsMatch = password === passwordRepeat;

    if (!passwordIsMatch) {
      throw new BadRequestException("Passwords not match");
    }

    const isValid = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isValid) {
      throw new BadRequestException("Incorrect passwords");
    }

    await this.userRepository.softRemove(user);

    this.cookieService.clearAuthCookies(response);
  }
}
