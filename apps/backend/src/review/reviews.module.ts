import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsSeederService } from "./seeds/reviews-seeder.service";
import { Review } from "./entities/review.entity";
import { User } from "src/shared/entities/user.entity";
import { Product } from "src/store/products/entities/product.entity";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { UserModule } from "src/user/user.module";
import { ProductsModule } from "src/store/products/products.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Product]),
    UserModule,
    ProductsModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsSeederService, ReviewsService],
  exports: [ReviewsSeederService],
})
export class ReviewsModule {}
