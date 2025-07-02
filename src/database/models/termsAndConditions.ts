import mongoose, { Schema, Document } from "mongoose";

export interface ITermsAndConditions extends Document {
    version: string;
    title: string;
    content: string;
    summary?: string;
    slug: string;
    type: string;
    effectiveDate: Date;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const TermsAndConditionsSchema: Schema = new Schema({
    version: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["general", "privacy", "shipping", "refund", "return", "seller", "customer"] },
    effectiveDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
}, {
    timestamps: true
})

const TermsAndConditions = mongoose.model<ITermsAndConditions>("TermsAndConditions", TermsAndConditionsSchema);

export default TermsAndConditions;