
import mongoose from "mongoose";
import envConfig from "./config.js";

async function connectToDb(){
    try{
        mongoose.connection.on("connected",()=>{
            console.log("database connection vayo")
        })
       await mongoose.connect(envConfig.mongoConnectionString as string)
    }
    catch (error){
        console.log("error")
        process.exit(1)
    }
}
export default connectToDb