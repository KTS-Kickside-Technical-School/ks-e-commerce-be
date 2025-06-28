import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShop extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    logo?: string;
    images?: string[];
    seller: any;
    phone?: any;
    address?: {
        _id?: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    status: string;
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
        phone: {
            type: String,
            required: false
        },
        address: {
            type: Object,
            required: false,
            default: ''
        },
        status:{
            type: String,
            enum: ["active", "inactive"],
            default: "active"

        },
    },
    { timestamps: true }
);

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
