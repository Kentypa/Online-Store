import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { WriteReviewDto } from "./dto/write-review.dto";
import { UserService } from "src/user/user.service";
import { ProductsService } from "src/store/products/products.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private userService: UserService,
    private productService: ProductsService,
  ) {}

  async writeReview(
    { comment, rating, productId }: WriteReviewDto,
    userId: number,
  ) {
    const user = await this.userService.getById(userId);
    if (!user) throw new BadRequestException("User not found");

    const products = await this.productService.getProducts({
      ids: [productId],
    });
    if (!products?.data?.length)
      throw new BadRequestException("Product not found");

    const existingReview = await this.reviewRepository.findOneBy({
      userId: userId,
      productId: productId,
    });
    if (existingReview) throw new BadRequestException("Review already exists");

    const userReview = this.reviewRepository.create({
      comment,
      rating,
      userId: userId,
      productId: productId,
    });

    return this.reviewRepository.save(userReview);
  }
}
