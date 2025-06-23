import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRefreshToken } from "src/shared/entities/user-refresh-tokens.entity";
import { User } from "src/shared/entities/user.entity";
import { EncryptionService } from "src/shared/services/encryption.service";
import { Repository } from "typeorm";

@Injectable()
export class UserRefreshTokenService {
  constructor(
    @InjectRepository(UserRefreshToken)
    private refreshTokenRepository: Repository<UserRefreshToken>,
    private encryptionService: EncryptionService,
  ) {}

  async createRefreshToken(
    userId: number,
    deviceId: string,
    refreshToken: string,
    expiresDate: Date,
  ): Promise<UserRefreshToken> {
    const hashedToken = await this.encryptionService.hashData(refreshToken);

    const tokenEntity = new UserRefreshToken();
    tokenEntity.userId = userId;
    tokenEntity.deviceId = deviceId;
    tokenEntity.refreshToken = hashedToken;
    tokenEntity.expiresDate = expiresDate;

    return await this.refreshTokenRepository.save(tokenEntity);
  }

  async updateRefreshToken(
    userId: number,
    deviceId: string,
    refreshToken: string,
    expiresDate: Date,
  ): Promise<UserRefreshToken> {
    const hashedToken = await this.encryptionService.hashData(refreshToken);

    let tokenEntity = await this.refreshTokenRepository.findOne({
      where: { userId, deviceId },
    });

    if (tokenEntity) {
      tokenEntity.refreshToken = hashedToken;
      tokenEntity.expiresDate = expiresDate;
    } else {
      tokenEntity = new UserRefreshToken();
      tokenEntity.userId = userId;
      tokenEntity.deviceId = deviceId;
      tokenEntity.refreshToken = hashedToken;
      tokenEntity.expiresDate = expiresDate;
    }

    return await this.refreshTokenRepository.save(tokenEntity);
  }

  async verifyRefreshToken(
    user: User,
    deviceId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { userId: user.id, deviceId },
    });

    if (!tokenEntity) return false;

    if (tokenEntity.expiresDate < new Date()) {
      await this.deleteRefreshTokenByDevice(deviceId);
      return false;
    }

    return this.encryptionService.compare(
      refreshToken,
      tokenEntity.refreshToken,
    );
  }

  async deleteRefreshTokenByDevice(deviceId: string): Promise<void> {
    await this.refreshTokenRepository.delete({ deviceId });
  }

  async deleteAllUserRefreshTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ userId });
  }
}
