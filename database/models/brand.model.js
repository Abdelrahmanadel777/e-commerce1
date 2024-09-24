import { model, Schema } from "mongoose";

const brandSchema = new Schema({
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
    logo: String
}, { timestamps: true, versionKey: false })

brandSchema.post('init', (doc) => {
    doc.logo = process.env.BASE_URL + "brands/" + doc.logo
})
export const Brands = model('Brands', brandSchema)