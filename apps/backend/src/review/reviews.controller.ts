import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { WriteReviewDto } from "./dto/write-review.dto";
import { ReviewsService } from "./reviews.service";
import { Review } from "./entities/review.entity";
import { UserDecorator } from "src/shared/decorators/user.decorator";
import { User } from "src/shared/entities/user.entity";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("review")
@Controller("review")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Post("create-review")
  @ApiOperation({ summary: "Get countries with their translations" })
  @ApiResponse({
    status: 200,
    description: "Countries",
    type: WriteReviewDto,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async writeReview(
    @Body() writeReviewDto: WriteReviewDto,
    @UserDecorator() user: User,
  ): Promise<Review> {
    return this.reviewService.writeReview(
      {
        comment: writeReviewDto.comment,
        productId: writeReviewDto.productId,
        rating: writeReviewDto.rating,
      },
      user.id,
    );
  }
}
