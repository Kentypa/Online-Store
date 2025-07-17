import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "src/shared/entities/language.entity";
import { ProductTranslation } from "./entities/product-translation.entity";
import { Product } from "./entities/product.entity";
import { ProductSeederService } from "./seeds/product-seeder.service";
import { CategoryModule } from "../categories/categories.module";
import { Category } from "../categories/entities/category.entity";
import { ProductStats } from "./entities/product-stats.entity";
import { Region } from "src/geo/entities/region.entity";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { GeoModule } from "src/geo/geo.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductTranslation,
      ProductStats,
      Language,
      Category,
      Region,
    ]),
    CategoryModule,
    GeoModule,
  ],
  controllers: [ProductsController],
  providers: [ProductSeederService, ProductsService],
  exports: [ProductSeederService],
})
export class ProductsModule {}
