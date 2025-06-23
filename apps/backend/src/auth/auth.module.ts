import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { User } from "src/shared/entities/user.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { EncryptionService } from "src/shared/services/encryption.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { CookieService } from "src/shared/services/cookie.service";
import { UserRefreshTokenService } from "./refresh-token.service";
import { UserRefreshToken } from "src/shared/entities/user-refresh-tokens.entity";

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User, UserRefreshToken]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    EncryptionService,
    CookieService,
    UserRefreshTokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
