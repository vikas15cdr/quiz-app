import mongoose from 'mongoose';
import { MONGO_URI } from './constants.js';

const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error('MongoDB URI not configured');
    
    await mongoose.connect(MONGO_URI); // Removed deprecated options
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB Error:', err.message);
    process.exit(1);
  }
};

export default connectDB;