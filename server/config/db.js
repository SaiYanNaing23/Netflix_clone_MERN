import mongoose from 'mongoose';
import { Env_Vars } from './envVars.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(Env_Vars.MONGO_URI)
        console.log('MongoDB connected successfully', conn.connection.host);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
