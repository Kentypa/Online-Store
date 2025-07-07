import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CountryService } from "../services/country.service";
import { CountryTranslation } from "../entities/country-translation.entity";
import { RegionTranslation } from "../entities/region-translation.entity";
import { RegionService } from "../services/region.service";
import { CityTranslation } from "../entities/city-translation.entity";
import { CityService } from "../services/city.service";

@ApiBearerAuth()
@ApiTags("geo")
@Controller("geo")
export class GeoController {
  constructor(
    private countryService: CountryService,
    private regionService: RegionService,
    private cityService: CityService,
  ) {}

  @Get("countries")
  @ApiOperation({ summary: "Get countries with their translations" })
  @ApiResponse({
    status: 200,
    description: "Countries",
    type: CountryTranslation,
  })
  @HttpCode(200)
  async getCountries(
    @Query("langCode") langCode?: string,
  ): Promise<CountryTranslation[]> {
    return this.countryService.getCountries(langCode);
  }

  @Get("regions")
  @ApiOperation({ summary: "Get regions with their translations" })
  @ApiResponse({
    status: 200,
    description: "Regions",
    type: RegionTranslation,
  })
  @HttpCode(200)
  async getRegions(
    @Query("langCode") langCode?: string,
    @Query("countryCode") countryCode?: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<RegionTranslation[]> {
    return this.regionService.getRegions(langCode, countryCode, offset, limit);
  }

  @Get("cities")
  @ApiOperation({ summary: "Get cities with their translations" })
  @ApiResponse({
    status: 200,
    description: "cities",
    type: CityTranslation,
  })
  @HttpCode(200)
  async getCities(
    @Query("langCode") langCode?: string,
    @Query("regionId") regionId?: number,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<CityTranslation[]> {
    return this.cityService.getCities(langCode, regionId, offset, limit);
  }
}
