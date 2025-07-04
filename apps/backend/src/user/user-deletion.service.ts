import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan } from "typeorm";
import { User } from "src/shared/entities/user.entity";
import { UserRefreshTokenService } from "src/shared/services/refresh-token.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UserDeleteAccountService {
  private readonly logger = new Logger(UserDeleteAccountService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private refreshTokenService: UserRefreshTokenService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleCron() {
    this.logger.debug("Checking for users to hard delete...");

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const usersToDelete = await this.userRepository.find({
      withDeleted: true,
      where: {
        deletedAt: LessThan(thirtyDaysAgo),
      },
      relations: ["userStats", "userCharacteristics", "refreshTokens"],
    });

    for (const user of usersToDelete) {
      this.logger.debug(`Deleting user ID ${user.id}`);

      await this.refreshTokenService.deleteAllUserRefreshTokens(user.id);

      if (user.avatarUrl) {
        const fullPath = path.resolve(user.avatarUrl);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          this.logger.debug(`Deleted avatar for user ID ${user.id}`);
        }
      }

      await this.userRepository.remove(user);

      this.logger.debug(`User ID ${user.id} permanently removed`);
    }
  }
}
