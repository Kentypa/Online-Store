import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserFactory } from "./user.factory";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class UserAccountService {
  constructor(
    private dataSource: DataSource,
    private userFactory: UserFactory,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUserWithStats(email: string, password: string): Promise<User> {
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new ConflictException("Email already exists");

    return this.dataSource.transaction(async (manager) => {
      const user = this.userFactory.createUser(email, password);
      return manager.save(User, user);
    });
  }
}
