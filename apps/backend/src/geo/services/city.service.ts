import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { CityTranslation } from "../entities/city-translation.entity";
import { Cached } from "src/shared/decorators/cached.decorator";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityTranslation)
    private cityRepository: Repository<CityTranslation>,
  ) {}

  @Cached(
    300,
    (langCode?: string, regionId?: number, offset?: number, limit?: number) =>
      `city:${langCode ?? "all"}:${regionId ?? "all"}:${offset ?? "all"}:${limit ?? "all"}`,
  )
  async getCities(
    langCode?: string,
    regionId?: number,
    offset?: number,
    limit?: number,
  ): Promise<CityTranslation[]> {
    const options: FindManyOptions<CityTranslation> = {
      relations: ["city"],
      where: {},
    };

    if (langCode) {
      options.where = { ...options.where, langCode };
    }

    if (regionId) {
      options.where = {
        ...options.where,
        city: { regionId },
      };
    }

    if (offset !== undefined && offset < 0) {
      throw new BadRequestException("Offset must be non-negative");
    }

    if (limit !== undefined && limit < 0) {
      throw new BadRequestException("Limit must be non-negative");
    }

    if (limit !== undefined) {
      options.skip = offset ?? 0;
      options.take = limit;
    }

    return this.cityRepository.find(options);
  }
}
