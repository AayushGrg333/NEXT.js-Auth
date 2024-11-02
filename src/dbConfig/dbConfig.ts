import mongoose, { mongo } from "mongoose";


export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDb Connected");
        })

        connection.on('error',(error)=>{
            console.log("mongoDB connection error, please make sure db is up and running: ",error)
            process.exit()
        })


    } catch (error) {
        console.log("Something went wrong in connecting to DB")
    }
}