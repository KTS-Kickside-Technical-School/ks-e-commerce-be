import mongoose, { Document, Schema } from 'mongoose';

export interface ILocation extends Document {
    code: string;
    country: string;
    city: string;
}

const locationSchema = new Schema<ILocation>({
    code: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

locationSchema.index({ code: 1, country: 1, city: 1 }, { unique: true });

const Location = mongoose.model<ILocation>('Location', locationSchema);

export default Location;