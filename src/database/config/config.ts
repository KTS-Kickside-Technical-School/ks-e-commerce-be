import mongoose from "mongoose";
import dotenv from "dotenv"
import Stripe from "stripe";

dotenv.config()

const uri =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGO_PROD_DB
        : process.env.NODE_ENV === 'test'
            ? process.env.MONGO_TEST_DB
            : process.env.MONGO_DEV_DB;

export const connect = async(): Promise<void> =>{
    try {
        if (!uri){
            throw new Error ('Database not defined!')
        }
        await mongoose.connect(uri)
        console.log('Databse connection successfully!');
        
    } catch (error) {
        console.error(`Database connection error ${error}`);   
        process.exit(1)
    }
};

export default connect