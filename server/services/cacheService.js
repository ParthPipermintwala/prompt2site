import { redisClient } from "../config/redis.js";

export const CACHE_TTL_SECONDS = 2 * 24 * 60 * 60;

export const cacheKeys = {
  user: (userId) => `prompt2site:user:${userId}`,
  websiteList: (userId) => `prompt2site:websites:list:${userId}`,
  websiteDetail: (userId, websiteId) => `prompt2site:website:detail:${userId}:${websiteId}`,
  websiteSlug: (slug) => (slug ? `prompt2site:website:slug:${slug}` : null),
};

const canUseCache = () => redisClient?.isReady;

export const getJsonCache = async (key) => {
  if (!canUseCache()) return null;

  try {
    return await redisClient.json.get(key);
  } catch (error) {
    console.error("Redis get failed:", error.message);
    return null;
  }
};

export const setJsonCache = async (
  key,
  value,
  ttlSeconds = CACHE_TTL_SECONDS,
) => {
  if (!canUseCache()) return;

  try {
    await redisClient.json.set(key, "$", value);
    await redisClient.expire(key, ttlSeconds);
  } catch (error) {
    console.error("Redis set failed:", error.message);
  }
};

export const deleteCache = async (...keys) => {
  if (!canUseCache()) {
    console.log("Redis unavailable");
    return;
  }

  const validKeys = keys.filter(Boolean);

  console.log("DELETE REQUEST:", validKeys);

  if (!validKeys.length) {
    console.log("No valid keys");
    return;
  }

  try {
    const existing = await redisClient.exists(...validKeys);

    console.log("Keys exist count:", existing);

    const deleted = await redisClient.del(...validKeys);

    console.log("Deleted keys count:", deleted);
  } catch (error) {
    console.error("Redis delete failed:", error);
  }
};
