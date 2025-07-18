import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, Repository } from "typeorm";
import { User } from "src/shared/entities/user.entity";
import { Product } from "src/store/products/entities/product.entity";
import { fakerEN } from "@faker-js/faker";
import { Review } from "../entities/review.entity";

@Injectable()
export class ReviewsSeederService {
  private readonly logger = new Logger(ReviewsSeederService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async seed(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.logger.log("Checking if reviews seeding is needed...");

      const existingReviewCount = await queryRunner.manager.count(Review);
      if (existingReviewCount > 0) {
        this.logger.log(
          `Skipping seeding: ${existingReviewCount} reviews already exist.`,
        );
        await queryRunner.rollbackTransaction();
        return;
      }

      const existingUserCount = await queryRunner.manager.count(User);
      const needToCreateUsers = existingUserCount < 100;

      let users: User[];
      if (needToCreateUsers) {
        this.logger.log("Not enough users in DB, seeding new users...");
        users = await this.seedUsers(queryRunner.manager);
      } else {
        this.logger.log("Using existing users...");
        users = await queryRunner.manager.find(User, { take: 100 });
      }

      const products = await queryRunner.manager.find(Product);
      if (products.length === 0) {
        this.logger.warn("No products found. Aborting reviews seeding.");
        await queryRunner.rollbackTransaction();
        return;
      }

      await this.seedReviews(queryRunner.manager, products, users);

      await queryRunner.commitTransaction();
      this.logger.log("Reviews seeding completed.");
    } catch (error) {
      this.logger.error("Seeding reviews failed:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async seedUsers(manager: EntityManager): Promise<User[]> {
    this.logger.log("Seeding users for reviews...");

    const users: Partial<User>[] = Array.from({ length: 100 }, () => ({
      email: fakerEN.internet.email().slice(0, 320),
      firstName: fakerEN.person.firstName().slice(0, 64),
      lastName: fakerEN.person.lastName().slice(0, 64),
      phoneNumber: fakerEN.phone.number({ style: "human" }).slice(0, 20),
      password: fakerEN.internet.password({ length: 20 }),
    }));

    await manager.insert(User, users);

    const insertedUsers = await manager.find(User);
    this.logger.log(`Seeded ${insertedUsers.length} users.`);
    return insertedUsers;
  }

  private async seedReviews(
    manager: EntityManager,
    products: Product[],
    users: User[],
  ): Promise<void> {
    this.logger.log("Generating reviews for products...");

    const reviews: Partial<Review>[] = [];

    for (const product of products) {
      const reviewCount = fakerEN.number.int({ min: 3, max: 10 });
      const reviewers = fakerEN.helpers.arrayElements(users, reviewCount);

      for (const user of reviewers) {
        reviews.push({
          product_id: product.id,
          user_id: user.id,
          rating: fakerEN.number.int({ min: 1, max: 5 }),
          comment: fakerEN.lorem.sentences(
            fakerEN.number.int({ min: 1, max: 3 }),
          ),
        });
      }
    }

    await this.insertInChunks(manager, Review, reviews, 500, "Reviews");
  }

  private async insertInChunks<T>(
    manager: EntityManager,
    entity: { new (): T },
    items: Partial<T>[],
    chunkSize = 500,
    logPrefix = "Insert",
  ): Promise<void> {
    this.logger.log(`${logPrefix}: inserting ${items.length} records...`);
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      await manager.insert(entity, chunk);
    }
    this.logger.log(`${logPrefix}: done.`);
  }
}
