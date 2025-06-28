import { Schema, model, Document, Types } from 'mongoose';

export interface IShippingOptions {
    fee: number;
    note: string;
    duration: string;
}

export interface IShippingAddress {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
}

export interface IContactInfo {
    phone: string;
    email: string;
}

export interface IOrderTrackingEntry {
    status: string;
    note?: string;
    timestamp: Date;
}

export interface IOrder {
    user: Types.ObjectId;
    product: Types.ObjectId;
    productName: string;
    productImages: string[];
    quantity: number;
    originalPrice: number;
    finalUnitPrice: number;
    discount: number;
    finalTotalPrice: number;
    shippingOptions: IShippingOptions;
    shippingAddress: IShippingAddress;
    contactInfo: IContactInfo;
    paymentMethod: 'momo' | 'visa' | 'stripe' | 'cash' | 'paypal';
    paymentStatus: 'pending' | 'confirmed' | 'failed' | 'refunded';
    paymentProof?: string;
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    isPaid: boolean;
    paidAt?: Date;
    deliveredAt?: Date;
    trackingCode?: string;
    orderTrackingHistory: IOrderTrackingEntry[];
}

interface IOrderDocument extends IOrder, Document { }


const OrderSchema = new Schema<IOrderDocument>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true },
        productImages: { type: [String], default: [] },
        quantity: { type: Number, default: 1 },
        originalPrice: { type: Number, required: true },
        finalUnitPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        finalTotalPrice: { type: Number, required: true },

        shippingOptions: {
            fee: Number,
            note: String,
            duration: String,
        },
        shippingAddress: {
            street: String,
            city: String,
            region: String,
            postalCode: String,
            country: String,
        },
        contactInfo: {
            phone: String,
            email: String,
        },

        paymentMethod: {
            type: String,
            enum: ['momo', 'visa', 'stripe', 'cash', 'paypal'],
            default: 'momo',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentProof: String,

        orderStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },

        isPaid: { type: Boolean, default: false },
        paidAt: Date,
        deliveredAt: Date,

        trackingCode: {
            type: String,
            unique: true,
        },

        orderTrackingHistory: [
            {
                status: { type: String, required: true },
                note: String,
                timestamp: { type: Date, default: Date.now },
            }
        ]
    },
    { timestamps: true }
);

const generateTrackingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const now = new Date();

    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const datePart = year + month + day;

    let randomPart = '';
    for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `KS${datePart}${randomPart}`;
};

OrderSchema.pre<IOrderDocument>('save', async function (next) {
    if (!this.trackingCode) {
        let unique = false;
        let newCode = '';

        while (!unique) {
            newCode = generateTrackingCode();
            const existing = await model('Order').findOne({ trackingCode: newCode }).exec();
            if (!existing) unique = true;
        }

        this.trackingCode = newCode;
    }
    next();
});

export default model<IOrderDocument>('Order', OrderSchema);
