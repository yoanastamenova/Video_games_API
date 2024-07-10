import mongoose from 'mongoose';
import 'dotenv/config'

export const dbConnection = () => {
    console.log('Start connection');
    return mongoose.connect( process.env.MONGO_URI, {})
}