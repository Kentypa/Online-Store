import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  Res,
  Get,
  Req,
} from "@nestjs/common";
import { Response, Request } from "express";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { JwtRefreshAuthGuard } from "src/shared/guards/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("auth")
@Controller("auth")
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "Add user to database" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: User,
  })
  @ApiBody({
    type: RegisterUserDto,
    description: "User information",
  })
  @HttpCode(201)
  async register(@Body() registeredUser: RegisterUserDto) {
    return this.authService.register(registeredUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 204,
    description: "User logged successfully",
  })
  @ApiBody({
    type: LoginUserDto,
    description: "User information",
  })
  @HttpCode(204)
  async login(
    @Body() user: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return await this.authService.login(
      user.email,
      user.password,
      request,
      response,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({
    status: 204,
    description: "User logout successfully",
  })
  @HttpCode(204)
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(request, response);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  @ApiOperation({ summary: "Refresh user token" })
  @ApiResponse({
    status: 204,
    description: "User token refreshed successfully",
  })
  @HttpCode(204)
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @UserDecorator() user: User,
  ) {
    return this.authService.refresh(user, request, response);
  }

  @UseGuards(JwtAuthGuard)
  @Get("validate")
  @ApiOperation({ summary: "Validate user token" })
  @ApiResponse({
    status: 204,
    description: "User token validated successfully",
  })
  @HttpCode(204)
  validate() {
    return this.authService.validateToken();
  }
}
