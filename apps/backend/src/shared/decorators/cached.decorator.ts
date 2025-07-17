import { ClassConstructor, plainToInstance } from "class-transformer";
import { CacheService } from "src/cache/cache.service";
import { Logger } from "@nestjs/common";

const logger = new Logger("CachedDecorator");

export function Cached<T>(
  classType?: ClassConstructor<T> | null,
  ttlInSeconds?: number,
  key?: string | ((...args: unknown[]) => string),
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: unknown[]) => Promise<T>>,
  ) {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
      throw new Error(`Decorator@Cached can only be applied to methods.`);
    }

    descriptor.value = async function (...args: unknown[]): Promise<T> {
      let cacheKey = `cache:${propertyKey}:`;
      if (typeof key === "function") {
        cacheKey += key(...args);
      } else if (typeof key === "string") {
        cacheKey += key;
      } else {
        cacheKey += JSON.stringify(args);
      }

      const cacheManager = CacheService.getInstance();

      try {
        const cached = await cacheManager.get<T>(cacheKey);
        if (cached != null) {
          logger.log(`Cache hit for ${propertyKey} with key: ${cacheKey}`);
          if (classType) {
            if (Array.isArray(cached)) {
              return cached.map((item) =>
                plainToInstance(classType, item, {
                  enableImplicitConversion: true,
                }),
              ) as unknown as T;
            }
            return plainToInstance(classType, cached, {
              enableImplicitConversion: true,
            });
          }
          return cached;
        }

        logger.log(`Cache miss for ${propertyKey}, calling original method.`);

        const result = await originalMethod.apply(this, args);

        await cacheManager.set<T>(
          cacheKey,
          result,
          (ttlInSeconds ?? 60) * 1000,
        );
        logger.log(
          `Cache set for ${propertyKey} with key: ${cacheKey} (TTL: ${ttlInSeconds ?? 60}s)`,
        );

        return result;
      } catch (error) {
        logger.error(`Cache error in ${propertyKey}: error`, error);
        return await originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
