import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'redis';
import AppError from '../../../errors/AppError';

const redisClient = Redis.createClient({
   host: process.env.REDIS_HOST,
   port: Number(process.env.REDIS_PORT),
   password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
   storeClient: redisClient,
   keyPrefix: 'rateLimit',
   points: 5,
   duration: 1,
});

export default async function rateLimiter(
   request: Request,
   response: Response,
   next: NextFunction,
): Promise<void> {
   try {
      await limiter.consume(request.ip);

      return next();
   } catch (error) {
      throw new AppError('Too many requests', 429);
   }
}
