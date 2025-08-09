const Redis = require('ioredis');

let redis;
const connectRedis = () => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    redis = new Redis(redisUrl);
    redis.on('connect', () => console.log('Redis connected'));
    redis.on('error', (err) => {
      console.error('Redis error:', err);
      console.warn('Continuing without Redis connection');
    });
  } catch (error) {
    console.warn('Redis connection failed, continuing without Redis:', error.message);
  }
};

const getRedis = () => {
  if (!redis) {
    console.warn('Redis not available, returning null');
    return null;
  }
  return redis;
};

module.exports = { connectRedis, getRedis };
