import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityTranslation } from "./entities/city-translation.entity";
import { Language } from "../shared/entities/language.entity";
import { RegionTranslation } from "./entities/region-translation.entity";
import { CountryTranslation } from "./entities/country-translation.entity";
import { City } from "./entities/city.entity";
import { Country } from "./entities/country.entity";
import { Region } from "./entities/region.entity";
import { GeoSeederService } from "./seeds/geo-seeder.service";
import { GeoController } from "./controllers/geo.controller";
import { CountryService } from "./services/country.service";
import { RegionService } from "./services/region.service";
import { CityService } from "./services/city.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Language,
      City,
      CityTranslation,
      Region,
      RegionTranslation,
      Country,
      CountryTranslation,
    ]),
  ],
  controllers: [GeoController],
  providers: [GeoSeederService, CountryService, RegionService, CityService],
  exports: [GeoSeederService],
})
export class GeoModule {}
