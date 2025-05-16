import User from "../models/user";
import mongoose from "mongoose";
import { hashPassword } from "../../helpers/authHelpers";
import { userOneId, userTwoId, userThreeId } from "../../types/seedIds";

const seedUsers = async () => {
    const users = [
        {
            _id: new mongoose.Types.ObjectId(userOneId),
            fullNames: "NIYONKURU Alexis",
            email: "niyonkurua97@gmail.com",
            password: await hashPassword("pass123"),
            role: "admin"
        },
        {
            _id: new mongoose.Types.ObjectId(userTwoId),
            fullNames: "NDANYUZWE Bruce",
            email: "brucendanyuzwe7@gmail.com",
            password: await hashPassword("pass123"),
            role: "seller"
        },
        {
            _id: new mongoose.Types.ObjectId(userThreeId),
            fullNames: "NDAHIMANA Bonheur",
            email: "ndahimana154@gmail.com",
            password: await hashPassword("pass123"),
            role: "customer"
        },
    ];
    await User.deleteMany({});
    await User.insertMany(users)
    console.log("Users seeded successfully");

}

export async function unseedUsers() {
    await User.deleteMany({});
    console.log("Users unseeded successfully");

}

export default seedUsers