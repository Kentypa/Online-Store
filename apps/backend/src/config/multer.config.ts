import { diskStorage } from "multer";
import { extname } from "path";
import { randomBytes } from "crypto";

export const avatarStorage = {
  storage: diskStorage({
    destination: "./uploads/users/avatars",
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const randomSuffix = randomBytes(6).toString("hex");
      const fileExt = extname(file.originalname);

      const filename = `${timestamp}-${randomSuffix}${fileExt}`;
      cb(null, filename);
    },
  }),
};
