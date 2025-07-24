import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetCategoriesQuery {
  @IsOptional()
  @IsString()
  langCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;
}
