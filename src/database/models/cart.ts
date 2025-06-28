import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICart extends Document {
    product: string;
    user: string;
    quantity: number;
}

const cartSchema = new Schema({
    product: {
        type: Types.ObjectId,
        required: true,
        ref:"Product"
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref:"User"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;