import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { GetUserDto } from "./dto/get-user.dto";
import { User } from "src/shared/entities/user.entity";
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { Response } from "express";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { RecoveryUserDto } from "./dto/recovery-account.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { avatarStorage } from "src/config/multer.config";
import { ValidationFilePipe } from "src/shared/pipes/validation-file.pipe";
import { FileMimeTypeValidator } from "src/shared/validators/file-mime-type.validator";
import {
  MAX_USER_AVATAR_SIZE_IN_BYTES,
  VALID_UPLOADS_MIME_TYPES,
} from "./constants/validation-settings.constant";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@ApiBearerAuth()
@ApiTags("user")
@Controller("user")
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get user by session ID" })
  @ApiResponse({
    status: 200,
    description: "User information",
    type: GetUserDto,
  })
  @HttpCode(200)
  async getCurrentUser(@UserDecorator() user: User): Promise<GetUserDto> {
    return this.userService.getSafeUser(user.id);
  }

  @Delete("delete-account")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Remove user from database" })
  @ApiResponse({
    status: 204,
    description: "User removed successfully",
  })
  @HttpCode(204)
  async deleteUser(
    @UserDecorator() user: User,
    @Body() passwordsDto: DeleteUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.delete(user.id, passwordsDto, response);
  }

  @Post("recovery-account")
  @ApiOperation({ summary: "Recovery user from database" })
  @ApiResponse({
    status: 204,
    description: "User recovered successfully",
  })
  @HttpCode(204)
  async recoveryUser(@Body() recoveryDataDto: RecoveryUserDto) {
    return this.userService.recoveryUser(recoveryDataDto);
  }

  @Patch("update")
  @UseGuards(JwtAuthGuard)
  @ApiConsumes("multipart/form-data")
  @HttpCode(200)
  @ApiOperation({
    summary: "Update user data from database, and uploads avatars to DB",
  })
  @ApiResponse({
    status: 200,
    description: "User successfully updated",
  })
  @UseInterceptors(FileInterceptor("avatar", avatarStorage))
  updateUser(
    @UploadedFile(
      new ValidationFilePipe(
        new ParseFilePipeBuilder()
          .addMaxSizeValidator({
            maxSize: MAX_USER_AVATAR_SIZE_IN_BYTES,
          })
          .addValidator(
            new FileMimeTypeValidator({ fileType: VALID_UPLOADS_MIME_TYPES }),
          )
          .build({
            fileIsRequired: false,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          }),
      ),
    )
    file: Express.Multer.File,
    @Body() updatedInfo: UpdateUserDto,
    @UserDecorator() user: User,
  ) {
    return this.userService.update(user.id, updatedInfo, file);
  }

  @Post("request-password-reset")
  @HttpCode(204)
  async requestPasswordReset(@Body("email") email: string) {
    await this.userService.sendResetPasswordMail(email);
  }

  @Post("reset-password")
  @HttpCode(204)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetPassword(resetPasswordDto);
  }
}
