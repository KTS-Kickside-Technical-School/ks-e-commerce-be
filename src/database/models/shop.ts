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
    payment?: {
        mobilePayment?: string;
        bankName?: string;
        accountNumber?: string;
    };
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    isWaitingForApproval?: boolean;
    isApproved?: boolean;
    rdbDocument?: string;
    rejectReason?: string;
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
        payment: {
            mobilePayment: {
                type: String,
                default: "other"
            },

            bankName: {
                type: String,
                default: "other"
            },
            accountNumber: {
                type: String,
                required: false,
            }
        },
        status: {
            type: String,
            default: "active"
        },
        isWaitingForApproval: {
            type: Boolean,
            default: false
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        rdbDocument: {
            type: String,
            required: false
        },
        rejectReason: {
            type: String,
            required: false,
            default: "Not rejected"
        }
    },
    { timestamps: true }
);

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
