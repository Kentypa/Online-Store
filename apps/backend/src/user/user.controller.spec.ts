import { Test } from "@nestjs/testing";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "src/shared/entities/user.entity";
import { City } from "src/geo/entities/city.entity";
import { Country } from "src/geo/entities/country.entity";
import { Region } from "src/geo/entities/region.entity";
import { Language } from "src/shared/entities/language.entity";

describe("UserController", () => {
  let userController: UserController;

  const mockUserService = {
    getSafeUser: jest
      .fn()
      .mockResolvedValue({ id: 1, firstName: "John", lastName: "Doe" }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it("should return current user", async () => {
    const mockUser: User = {
      id: 1,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      avatarUrl: "",
      language: new Language(),
      country: new Country(),
      region: new Region(),
      city: new City(),
      refreshTokens: [],
      passwordResetTokens: [],
      cart: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await userController.getCurrentUser(mockUser);
    expect(result).toEqual({ id: 1, firstName: "John", lastName: "Doe" });
    expect(mockUserService.getSafeUser).toHaveBeenCalledWith(1);
  });

  it("should return all users by id", async () => {
    const mockId = 1;
    const result = await userController.getUserById(mockId);
    expect(result).toEqual({ id: 1, firstName: "John", lastName: "Doe" });
    expect(mockUserService.getSafeUser).toHaveBeenCalledWith(1);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  it("should handle controller errors", async () => {
    const error = new Error("Database error");

    mockUserService.getSafeUser.mockRejectedValue(error);

    await expect(userController.getCurrentUser(new User())).rejects.toThrow(
      "Database error",
    );

    expect(mockUserService.getSafeUser).toHaveBeenCalled();
  });
});
