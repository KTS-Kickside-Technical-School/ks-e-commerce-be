import mongoose, { Schema } from "mongoose";

export interface iSession extends Document {
    user: mongoose.Schema.Types.ObjectId;
    content: string;
    expiresAt?: string;
}
const sesssionSchema = new mongoose.Schema<iSession>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    expiresAt: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Session = mongoose.model<iSession>('Session', sesssionSchema)

export default Session