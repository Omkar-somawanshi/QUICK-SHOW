import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database is connected'));
             
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/quickshow`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;