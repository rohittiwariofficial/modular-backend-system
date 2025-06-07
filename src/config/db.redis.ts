import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
  enableReadyCheck: false,
  tls: {} // 👈 this enables TLS (required by Upstash)
});

let hasConnected = false;

redis.on('connect', () => {
  if (!hasConnected) {
    console.log('✅ Redis connected');
    hasConnected = true;
  }
});

redis.on('error', err => {
  console.error('❌ Redis error:', err);
});

export default redis;
