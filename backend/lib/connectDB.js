import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "netflix-clone",
            bufferCommands: false
        })
        console.log(`Db connected at host ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to db`, + error.message)
        process.exit(1)
    }
}