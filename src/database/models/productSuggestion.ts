import mongoose, { Document, Schema } from "mongoose";

export interface IProductSuggestion extends Document {
    _id: mongoose.Types.ObjectId;
    productSuggestionName: string;
    productSuggestionImage: string;
    description: string;
    phoneNumber: string;
    email: string;
}

const productSuggestionSchema = new Schema<IProductSuggestion>({

    productSuggestionName: {
        type: String,
        required: false
    },
    productSuggestionImage:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
}, {timestamps: true});

const productSuggestion = mongoose.model<IProductSuggestion>("productSuggestion", productSuggestionSchema);

export default productSuggestion;