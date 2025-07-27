import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Region } from "../entities/region.entity";
import { RegionTranslation } from "../entities/region-translation.entity";
import { RegionService } from "./region.service";

jest.mock("../../shared/decorators/cached.decorator", () => ({
  Cached:
    () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
      descriptor,
}));

const createMockRegion = (id: number, regionCode: string): Region => {
  const region = new Region();
  region.id = id;
  region.country_code = regionCode;
  return region;
};

const createMockRegionTranslation = (
  langCode: string,
  name: string,
  region: Region,
): RegionTranslation => {
  const translation = new RegionTranslation();
  translation.lang_code = langCode;
  translation.name = name;
  translation.region = region;
  return translation;
};

describe("RegionService", () => {
  let service: RegionService;
  let repository: Repository<RegionTranslation>;
  let cacheManager: Cache;

  const mockRegion1 = createMockRegion(1, "UK");
  const mockRegion2 = createMockRegion(2, "GB");

  const mockCityTranslations: RegionTranslation[] = [
    createMockRegionTranslation("en", "Kirovogradskaya", mockRegion1),
    createMockRegionTranslation("uk", "Кіровоградська", mockRegion2),
  ];

  beforeEach(async () => {
    cacheManager = {
      cacheId: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      mget: jest.fn(),
      mset: jest.fn(),
      mdel: jest.fn(),
      ttl: jest.fn(),
      wrap: jest.fn(),
      clear: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      disconnect: jest.fn(),
      stores: [],
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: getRepositoryToken(RegionTranslation),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManager,
        },
      ],
    }).compile();

    service = module.get<RegionService>(RegionService);
    repository = module.get(getRepositoryToken(RegionTranslation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getRegions", () => {
    it("should return all regions when no langCode provided", async () => {
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(mockCityTranslations);

      const result = await service.getRegions();

      expect(findSpy).toHaveBeenCalledWith({
        relations: ["region"],
        where: {},
      });
      expect(result).toEqual(mockCityTranslations);
    });

    it("should return region filtered by langCode", async () => {
      const filteredCountries = [mockCityTranslations[0]];
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(filteredCountries);

      const result = await service.getRegions("en");

      expect(findSpy).toHaveBeenCalledWith({
        where: { lang_code: "en" },
        relations: ["region"],
      });
      expect(result).toEqual(filteredCountries);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      jest.spyOn(repository, "find").mockRejectedValue(error);

      await expect(service.getRegions()).rejects.toThrow("Database error");
    });

    it("should return empty array when no cities found", async () => {
      jest.spyOn(repository, "find").mockResolvedValue([]);

      const result = await service.getRegions("nonexistent");

      expect(result).toEqual([]);
    });
  });
});
