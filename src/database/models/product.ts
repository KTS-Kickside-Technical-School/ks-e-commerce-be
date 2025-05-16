import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    productName: string;
    description: string;
    images: string[];
    shop: any;
    price: Number;
    stock?: string;
    category: string;
    slug: string;
    discount: number;
    status: string
    createdAt?: Date;
    updatedAt?: Date;
}
const productSchema = new Schema<IProduct>({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: false,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: false,
        default: "active"
    }
}, { timestamps: true });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;