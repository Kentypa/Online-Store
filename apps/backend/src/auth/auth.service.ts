import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "src/shared/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { Response, Request } from "express";
import { UserService } from "src/user/user.service";
import { EncryptionService } from "src/shared/services/encryption.service";
import { JwtPayload } from "./types/jwt-payload.type";
import { RegisterUserDto } from "./dto/register-user.dto";
import { calculateTokenExpires } from "./functions/calculate-token-expires.function";
import { UserAccountService } from "src/user/user-account.service";
import { CookieService } from "src/shared/services/cookie.service";
import { UserRefreshTokenService } from "../shared/services/refresh-token.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private userAccountService: UserAccountService,
    private userRefreshTokenService: UserRefreshTokenService,
    private encryptionService: EncryptionService,
    private cookieService: CookieService,
  ) {}

  private getDeviceId(request: Request): string {
    return request.headers["device-id"] as string;
  }

  private generateTokens(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
    expiresAccessToken: Date;
    expiresRefreshToken: Date;
  } {
    const expiresAccessToken = calculateTokenExpires(
      this.configService.getOrThrow<string>("jwt.access_token_expires_in"),
    );

    const expiresRefreshToken = calculateTokenExpires(
      this.configService.getOrThrow<string>("jwt.refresh_token_expires_in"),
    );

    const accessTokenOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>("jwt.access_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.access_token_expires_in",
      )}ms`,
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: this.configService.getOrThrow<string>("jwt.refresh_token_secret"),
      expiresIn: `${this.configService.getOrThrow<string>(
        "jwt.refresh_token_expires_in",
      )}ms`,
    };

    const accessToken = this.jwtService.sign(payload, accessTokenOptions);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);

    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (user.deletedAt !== null) {
      throw new ForbiddenException("Account has been deleted");
    }

    const isMatch = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException("Passwords is not match");
    }

    return user;
  }

  async login(
    email: string,
    password: string,
    request: Request,
    response: Response,
  ): Promise<void> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const deviceId = this.getDeviceId(request);

    const payload: JwtPayload = {
      sub: user.id.toString(),
      username: user.email,
    };

    const tokens = this.generateTokens(payload);

    await this.userRefreshTokenService.updateRefreshToken(
      user.id,
      deviceId,
      tokens.refreshToken,
      tokens.expiresRefreshToken,
    );

    this.cookieService.setAuthCookies(
      response,
      tokens.accessToken,
      tokens.refreshToken,
      tokens.expiresAccessToken,
      tokens.expiresRefreshToken,
    );

    return;
  }

  async verifyUserRefreshToken(
    user: User,
    deviceId: string,
    refreshToken: string,
  ): Promise<User> {
    const isValid = await this.userRefreshTokenService.verifyRefreshToken(
      user,
      deviceId,
      refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return user;
  }

  async register(user: RegisterUserDto): Promise<User> {
    const existingUser = await this.authRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const passwordHash = await this.encryptionService.hashData(user.password);

    const newUser = await this.userAccountService.createUser(
      user.email,
      passwordHash,
    );

    return newUser;
  }

  async getById(id: number): Promise<User> {
    const user = await this.authRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async refresh(
    user: User,
    request: Request,
    response: Response,
  ): Promise<void> {
    const deviceId = this.getDeviceId(request);

    const payload: JwtPayload = {
      sub: user.id.toString(),
      username: user.email,
    };

    const tokens = this.generateTokens(payload);

    await this.userRefreshTokenService.updateRefreshToken(
      user.id,
      deviceId,
      tokens.refreshToken,
      tokens.expiresRefreshToken,
    );

    this.cookieService.setAuthCookies(
      response,
      tokens.accessToken,
      tokens.refreshToken,
      tokens.expiresAccessToken,
      tokens.expiresRefreshToken,
    );

    return;
  }

  async logout(request: Request, response: Response): Promise<void> {
    const deviceId = this.getDeviceId(request);

    await this.userRefreshTokenService.deleteRefreshTokenByDevice(deviceId);
    this.cookieService.clearAuthCookies(response);
  }

  validateToken(): void {
    return;
  }
}
