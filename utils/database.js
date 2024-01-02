import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    let url = "mongodb+srv://praneshbharadwaj631:pranesh123@cluster0.rxdft2x.mongodb.net/?retryWrites=true&w=majority"
    try {
        await mongoose.connect(process.env.MONGODb_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}