import { model, Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, 'name is required'],
        trim: true,
        minLength: [2, 'too short category name']
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 3000
    },
    slug: {
        type: String,
        lowercase: true,
    },
    imgCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0,

    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0,

    },
    sold: {
        type: Number
    },
    stock: {
        type: Number,
        min: 0
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: Schema.ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: Schema.ObjectId,
        ref: 'Brands'
    },
    rateAvg: {
        type: Number,
        max: 5,
        min: 0
    },
    rateCount: {
        type: Number,

    }



}, { timestamps: true, versionKey: false, toJSON: { virtuals: true } })

productSchema.virtual('myReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
});
productSchema.pre('findOne', function () {
    this.populate('myReviews')
})

productSchema.post('init', (doc) => {
    if (doc.imgCover) doc.imgCover = process.env.BASE_URL + "products/" + doc.imgCover


    if (doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img)


})
export const Products = model('Products', productSchema)