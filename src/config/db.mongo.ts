import mongoose from 'mongoose';

export const connectMongo = async () => {
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.error('❌ MONGO_URI not defined in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
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
