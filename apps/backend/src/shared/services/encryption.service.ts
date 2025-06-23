import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compare, hash } from "bcrypt";

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  hashData(data: string) {
    return hash(
      data,
      this.configService.getOrThrow<number>("encryption.salt_or_rounds"),
    );
  }

  compare(data: string, encrypted: string) {
    return compare(data, encrypted);
  }
}
