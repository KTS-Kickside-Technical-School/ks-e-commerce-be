import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    totalAmount: number;
    items: {
        product: mongoose.Schema.Types.ObjectId;
        productName: string;
        quantity: number;
        price: number;
        discount: number;
        images: string[];
        originalPrice: number;
    }[];
    paymentMethod: string;
    shippingAddress: {
        street: string;
        city: string;
        region: string;
        zip: string;
        country: string;
    };
    orderProcesses: {
        process: string;
        date: Date;
    }[];
    orderStatus?: "Pending" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
    trackingNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const generateTrackingNumber = (): string => {
    const now = new Date();
    const hourCode = now.getHours().toString().padStart(2, '0');
    const ms = now.getMilliseconds().toString().padStart(3, '0');
    const random = Math.floor(100 + Math.random() * 900).toString();
    return `${hourCode}${ms}${random}`;
};

const orderSchema = new mongoose.Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        items: [
            {
                product: { type: String, required: true },
                productName: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, default: 0 },
                images: { type: [String], required: true },
                originalPrice: { type: Number, required: true },
            },
        ],
        paymentMethod: {
            type: String,
            required: true,
        },
        shippingAddress: {
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
    { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
