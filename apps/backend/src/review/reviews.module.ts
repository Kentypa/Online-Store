import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsSeederService } from "./seeds/reviews-seeder.service";
import { Review } from "./entities/review.entity";
import { User } from "src/shared/entities/user.entity";
import { Product } from "src/store/products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
  controllers: [],
  providers: [ReviewsSeederService],
  exports: [ReviewsSeederService],
})
export class ReviewsModule {}
