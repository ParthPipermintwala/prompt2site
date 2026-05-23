import { redisClient } from "../config/redis.js";

export const CACHE_TTL_SECONDS = 2 * 24 * 60 * 60;

export const cacheKeys = {
  user: (userId) => `prompt2site:user:${userId}`,
  websiteList: (userId) => `prompt2site:websites:list:${userId}`,
  websiteDetail: (userId, websiteId) => `prompt2site:website:detail:${userId}:${websiteId}`,
  websiteSlug: (userId, slug) => (slug ? `prompt2site:website:slug:${userId}:${slug}` : null),
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
  if (!canUseCache()) return;

  const validKeys = keys.filter(Boolean);
  if (!validKeys.length) return;

  try {
    await redisClient.del(...validKeys);
  } catch (error) {
    console.error("Redis delete failed:", error.message);
  }
};
