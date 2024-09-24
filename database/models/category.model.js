import { model, Schema } from "mongoose";

const categorySchema = new Schema({
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

    },
    image: String
}, { timestamps: true, versionKey: false })

categorySchema.post('init', (doc) => {
    doc.image = process.env.BASE_URL + "categories/" + doc.image
})
export const Category = model('Category', categorySchema)