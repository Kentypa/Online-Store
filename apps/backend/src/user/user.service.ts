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
import { UpdateUserDto } from "./dto/update-user.dto";
import * as fs from "fs";
import * as path from "path";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { Response } from "express";
import { CookieService } from "src/shared/services/cookie.service";
import { RecoveryUserDto } from "./dto/recovery-account.dto";
import { UserCharacteristics } from "src/shared/entities/user-characteristics.entity";
import { UserStats } from "src/shared/entities/user-stats.entity";

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
      relations: ["userStats", "userCharacteristics"],
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

    if (user.userStats?.id) {
      await this.dataSource.getRepository(UserStats).restore(user.userStats.id);
    }

    if (user.userCharacteristics?.id) {
      await this.dataSource
        .getRepository(UserCharacteristics)
        .restore(user.userCharacteristics.id);
    }
    return;
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
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
    try {
      const user = await this.getById(id);

      if (dto.email) user.email = dto.email;
      if (dto.username) user.username = dto.username;

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

      if (avatar && avatar.path) {
        if (user.avatarUrl) {
          const oldPath = path.resolve(user.avatarUrl);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }

        user.avatarUrl = path.join(avatar.path);
      }

      return await this.userRepository.save(user);
    } catch {
      if (avatar && avatar.path && fs.existsSync(avatar.path)) {
        fs.unlinkSync(avatar.path);
      }
    }
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
