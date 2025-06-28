import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    name?: string
}

const categorySchema = new Schema ({
    name: {
        type: String,
        required: true,    
    }
}, {timestamps: true});

const Category = mongoose.model<ICategory>("Category", categorySchema)

export default Category;