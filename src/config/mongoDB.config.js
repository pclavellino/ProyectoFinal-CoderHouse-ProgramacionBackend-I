import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("")
        console.log("Mongo DB Conectado")
    } catch(error) {
        console.log(`${error}`)
    }
}