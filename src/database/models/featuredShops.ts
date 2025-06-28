import mongoose, { Schema, Document } from "mongoose";

export interface iFeaturedShops extends Document {
    shop: Schema.Types.ObjectId;
    title: string;
    description: string;
    status: "active" | "inactive";
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<iFeaturedShops>({
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shops",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, { timestamps: true });

const FeaturedShops = mongoose.model<iFeaturedShops>("FeaturedShops", userSchema);

export default FeaturedShops;