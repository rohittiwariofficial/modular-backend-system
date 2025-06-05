import Redis from 'ioredis';

const redis = new Redis(); // defaults to localhost:6379

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', err => console.error('❌ Redis error:', err));

export default redis;