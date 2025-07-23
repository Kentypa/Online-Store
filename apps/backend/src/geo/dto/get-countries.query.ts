import { IsOptional, IsString } from "class-validator";

export class GetCountriesQuery {
  @IsString()
  @IsOptional()
  langCode?: string;
}
