import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connected');
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ MongoDB connection failed:', err.message);
    } else {
      console.error('❌ MongoDB connection failed:', err);
    }
    process.exit(1);
  }
};