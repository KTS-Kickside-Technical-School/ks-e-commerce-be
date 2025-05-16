import mongoose, { Document } from "mongoose";
import { generateTrackingNumber } from "./order";

export interface ISingleProductOrders extends Document {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    finalUnitPrice: number;
    discount: number;
    images: string[];
    finalTotalPrice: number;
    originalPrice: number;
    productName: string;
    paymentMethod: string;
    addresses: {
        street: string;
        city: string;
        region: string;
        postalCode: string;
        country: string;
    };
    customer: mongoose.Schema.Types.ObjectId;
    courier: string;
    orderProcesses: {
        process: string;
        date: Date;
        images?: string[];
    }[];
    orderStatus?: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
    trackingNumber: string;
}

const singleProductOrderSchema = new mongoose.Schema<ISingleProductOrders>(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        finalUnitPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        images: {
            type: [String],
            required: true,
        },
        finalTotalPrice: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        courier: {
            type: String,
            required: false,
        },
        productName: {
            type: String,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        addresses: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            region: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        orderProcesses: [
            {
                process: { type: String, required: true },
                date: { type: Date, default: Date.now },
                images: {
                    type: [String],
                    required: false
                }
            },
        ],
        orderStatus: {
            type: String,
            enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        trackingNumber: {
            type: String,
            default: generateTrackingNumber,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const SingleProductOrder = mongoose.model<ISingleProductOrders>("SingleProductOrder", singleProductOrderSchema);

export default SingleProductOrder;