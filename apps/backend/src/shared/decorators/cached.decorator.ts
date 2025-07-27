import { CacheService } from "src/cache/cache.service";
import { Logger } from "@nestjs/common";

const logger = new Logger("CachedDecorator");

export function Cached<T>(
  ttlInSeconds?: number,
  key?: string | ((...args: unknown[]) => string),
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: unknown[]) => Promise<T>>,
  ) {
    const originalMethod = descriptor.value;
    if (!originalMethod) {
      throw new Error(
        `Decorator @Cached can only be applied to async methods.`,
      );
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
        logger.error(`Cache error in ${propertyKey}:`, error);
        return await originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
