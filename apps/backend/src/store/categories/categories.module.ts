import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { CategoryTranslation } from "./entities/category-translation.entity";
import { Language } from "src/shared/entities/language.entity";
import { CategoryController } from "./controllers/category.controller";
import { CategoryService } from "./services/category.service";
import { CategorySeederService } from "./seeds/category-seeder.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategoryTranslation, Language]),
  ],
  controllers: [CategoryController],
  providers: [CategorySeederService, CategoryService],
  exports: [CategorySeederService],
})
export class CategoryModule {}
