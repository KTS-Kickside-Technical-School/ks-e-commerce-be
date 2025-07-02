import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema, Document } from "mongoose";

export interface IAddress {
    _id?: string;
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
    isPrimary: boolean;
}

export const addressSchema = new Schema<IAddress>({
    _id: {
        type: String,
        default: () => uuidv4(),
        required: true
    },
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    isPrimary: { type: Boolean, default: false }
});

export interface IUser extends Document {
    fullNames?: string;
    email: string;
    password: string;
    role: "admin" | "customer" | "seller";
    bio?: string | null;
    profile?: string | null;
    phone?: string | null;
    addresses: IAddress[];
    isDisabled?: boolean;
    isEmailVerified?: boolean;
    isUserVerified?: boolean;
    idDocument?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        fullNames: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters']
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "customer", "seller"],
            default: "customer"
        },
        bio: {
            type: String,
            default: null,
        },
        profile: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            default: null,
        },
        addresses: {
            type: [addressSchema],
            default: []
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isUserVerified: {
            type: Boolean,
            default: false,
        },
        idDocument: {
            type: String,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'addresses.coordinates': '2dsphere' });

addressSchema.pre('save', function (next) {
    if (!this._id) {
        this._id = uuidv4();
    }
    next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;