import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
// Load environment variables before anything else
dotenv.config();
import cors from 'cors';
import { protect } from './shared/middleware/auth.middleware';
import { AuthRequest } from './types/express';
import { connectMongo } from './config/db.mongo';
import redis from './config/db.redis';
import { setupSwagger } from './config/swagger';
import authRoutes from './services/auth/routes/auth.route';
import userRoutes from './services/user/routes/user.route';
import adminRoutes from './services/admin/routes/admin.route';

// Load environment variables before anything else
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.json());

// Connect database
// connectMongo();
(async () => {
  await connectMongo();
  // Start your server after connection is successful
})();
// DO NOT call redis.connect() manually — ioredis auto-connects
// redis.connect().catch(err => console.log('❌ Redis connect error:', err));
async function connectRedis() {
  await redis.connect(); // Connect once when app starts
}

connectRedis();

// Swagger
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Api is running 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
