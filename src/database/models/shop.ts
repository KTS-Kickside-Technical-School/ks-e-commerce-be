import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShop extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    logo?: string;
    images?: string[];
    seller: any;
    createdAt?: Date;
    updatedAt?: Date;
}

const shopSchema = new Schema<IShop>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        logo: {
            type: String,
            required: false,
        },
        images: {
            type: [String],
            required: false,
        },
        seller: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
