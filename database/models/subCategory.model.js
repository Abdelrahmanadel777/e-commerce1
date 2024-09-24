import { model, Schema } from "mongoose";

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'name is required'],
        trim: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        reqired: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true, versionKey: false })
export const SubCategory = model('SubCategory', SubCategorySchema)