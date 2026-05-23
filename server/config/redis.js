import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

export const redisClient = redisUrl
  ? createClient({
      url: redisUrl,
    })
  : null;

if (redisClient) {
  redisClient.on("error", (error) => {
    console.error("Redis error:", error.message);
  });
}

export const connectRedis = async () => {
  if (!redisClient) {
    console.warn("REDIS_URL is not set. Redis cache is disabled.");
    return;
  }

  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Redis connected");
    } catch (error) {
      console.error("Redis connection failed:", error.message);
    }
  }
};
