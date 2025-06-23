import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { existsSync, unlinkSync } from "fs";
import { ParseFilePipe } from "@nestjs/common";

@Injectable()
export class ValidationFilePipe implements PipeTransform {
  constructor(private readonly parseFilePipe: ParseFilePipe) {}

  async transform(value: Express.Multer.File) {
    try {
      return (await this.parseFilePipe.transform(value)) as Express.Multer.File;
    } catch {
      const filePath = value.path;

      if (filePath && existsSync(filePath)) {
        try {
          unlinkSync(filePath);
        } catch (fsErr) {
          console.error("Cant delete file", fsErr);
        }
      }
      throw new BadRequestException("Validation Error");
    }
  }
}
