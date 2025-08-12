import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { RegionTranslation } from "../entities/region-translation.entity";
import { Cached } from "src/shared/decorators/cached.decorator";

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionTranslation)
    private regionRepository: Repository<RegionTranslation>,
  ) {}

  @Cached(
    300,
    (
      langCode?: string,
      countryCode?: string,
      offset?: number,
      limit?: number,
    ) =>
      `region:${langCode ?? "all"}:${countryCode ?? "all"}:${offset ?? "all"}:${limit ?? "all"}`,
  )
  async getRegions(
    langCode?: string,
    countryCode?: string,
    offset?: number,
    limit?: number,
  ): Promise<RegionTranslation[]> {
    const options: FindManyOptions<RegionTranslation> = {
      relations: ["region"],
      where: {},
    };

    if (langCode) {
      options.where = { ...options.where, langCode: langCode };
    }

    if (countryCode) {
      options.where = {
        ...options.where,
        region: { countryCode: countryCode },
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

    return this.regionRepository.find(options);
  }
}
