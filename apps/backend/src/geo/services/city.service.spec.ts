import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { City } from "../entities/city.entity";
import { CityTranslation } from "../entities/city-translation.entity";
import { CityService } from "./city.service";

jest.mock("../../shared/decorators/cached.decorator", () => ({
  Cached:
    () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
      descriptor,
}));

const createMockCity = (id: number): City => {
  const city = new City();
  city.id = id;
  return city;
};

const createMockCityTranslation = (
  langCode: string,
  name: string,
  city: City,
): CityTranslation => {
  const translation = new CityTranslation();
  translation.lang_code = langCode;
  translation.name = name;
  translation.city = city;
  return translation;
};

describe("CityService", () => {
  let service: CityService;
  let repository: Repository<CityTranslation>;
  let cacheManager: Cache;

  const mockCity1 = createMockCity(1);
  const mockCity2 = createMockCity(2);

  const mockCityTranslations: CityTranslation[] = [
    createMockCityTranslation("en", "London", mockCity1),
    createMockCityTranslation("uk", "Лондон", mockCity2),
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
        CityService,
        {
          provide: getRepositoryToken(CityTranslation),
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

    service = module.get<CityService>(CityService);
    repository = module.get(getRepositoryToken(CityTranslation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getCities", () => {
    it("should return all cities when no langCode provided", async () => {
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(mockCityTranslations);

      const result = await service.getCities();

      expect(findSpy).toHaveBeenCalledWith({
        relations: ["city"],
        where: {},
      });
      expect(result).toEqual(mockCityTranslations);
    });

    it("should return city filtered by langCode", async () => {
      const filteredCountries = [mockCityTranslations[0]];
      const findSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(filteredCountries);

      const result = await service.getCities("en");

      expect(findSpy).toHaveBeenCalledWith({
        where: { lang_code: "en" },
        relations: ["city"],
      });
      expect(result).toEqual(filteredCountries);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      jest.spyOn(repository, "find").mockRejectedValue(error);

      await expect(service.getCities()).rejects.toThrow("Database error");
    });

    it("should return empty array when no cities found", async () => {
      jest.spyOn(repository, "find").mockResolvedValue([]);

      const result = await service.getCities("nonexistent");

      expect(result).toEqual([]);
    });
  });
});
