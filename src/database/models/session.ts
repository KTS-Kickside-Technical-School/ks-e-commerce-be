import mongoose, { Schema } from "mongoose";

const sesssionSchema = new Schema ({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Session = mongoose.model('Session', sesssionSchema)

export default Session