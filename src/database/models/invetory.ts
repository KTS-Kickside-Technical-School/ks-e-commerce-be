import mongoose, { Document, Schema } from "mongoose";

export enum invetoryType {
    PRODUCT_ADDED = 'Product Added To The Shop',
    PRODUCT_UPDATED = 'Product Updated',
    PRODUCT_DELETED = 'Product Deleted',
    PRODUCT_STOCK_IN = 'Product Stock In',
    STOCK_OUT = "STOCK_OUT"
};

export interface IInvetory extends Document {
    _id: mongoose.Types.ObjectId,
    shop: any;
    type: invetoryType;
    product: any;
    oldData?: any;
    newData?: any;
    createdAt: Date;
    updatedAt: Date
};

const invetorySchema = new Schema<IInvetory>({
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    type: {
        type: String,
        enum: Object.values(invetoryType),
        required: true
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    oldData: {
        type: Schema.Types.Mixed
    },
    newData: {
        type: Schema.Types.Mixed
    }
},{ timestamps: true });

const Invetory = mongoose.model<IInvetory>("Invetory", invetorySchema)

export default Invetory