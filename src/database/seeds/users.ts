import User from "../models/user";
import mongoose from "mongoose";
import { hashPassword } from "../../helpers/authHelpers";
import { userOneId, userTwoId, userThreeId } from "../../types/seedIds";

type SeedRole = "admin" | "seller" | "customer";

type SeedUser = {
    _id: mongoose.Types.ObjectId;
    fullNames: string;
    email: string;
    role: SeedRole;
};

const DEFAULT_SEED_PASSWORD = process.env.DEFAULT_SEED_USER_PASSWORD || "pass1234";

const defaultUsers: SeedUser[] = [
    {
        _id: new mongoose.Types.ObjectId(userOneId),
        fullNames: "System Admin",
        email: "admin@kickside.com",
        role: "admin"
    },
    {
        _id: new mongoose.Types.ObjectId(userTwoId),
        fullNames: "Default Seller",
        email: "seller@kickside.com",
        role: "seller"
    },
    {
        _id: new mongoose.Types.ObjectId(userThreeId),
        fullNames: "Default Customer",
        email: "customer@kickside.com",
        role: "customer"
    }
];

const isBcryptHash = (value: string): boolean => /^\$2[aby]\$\d{2}\$/.test(value);

export const seedUsers = async (): Promise<void> => {
    let createdCount = 0;

    for (const seedUser of defaultUsers) {
        const existingUser = await User.findOne({ email: seedUser.email });

        if (!existingUser) {
            const encryptedPassword = await hashPassword(DEFAULT_SEED_PASSWORD);
            await User.create({
                ...seedUser,
                password: encryptedPassword,
                isEmailVerified: true
            });
            createdCount += 1;
            continue;
        }

        const updatePayload: { fullNames?: string; role?: SeedRole; password?: string } = {};

        if (existingUser.fullNames !== seedUser.fullNames) {
            updatePayload.fullNames = seedUser.fullNames;
        }

        if (existingUser.role !== seedUser.role) {
            updatePayload.role = seedUser.role;
        }

        if (!isBcryptHash(existingUser.password)) {
            updatePayload.password = await hashPassword(existingUser.password);
        }

        if (Object.keys(updatePayload).length > 0) {
            await User.updateOne({ _id: existingUser._id }, { $set: updatePayload });
        }
    }

    if (createdCount > 0) {
        console.log(`Default users seeded successfully. Created: ${createdCount}`);
    } else {
        console.log("Default users already exist. No new users created.");
    }
};

export const unseedUsers = async (): Promise<void> => {
    const defaultUserEmails = defaultUsers.map((user) => user.email);
    await User.deleteMany({ email: { $in: defaultUserEmails } });
    console.log("Default users unseeded successfully");
};

export default seedUsers;