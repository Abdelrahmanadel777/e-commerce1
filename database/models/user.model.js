import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'name is required'],
        trim: true,
        minLength: [2, 'too short category name']
    },
    email: String,
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    wishlist: [{
        type: Schema.ObjectId,
        ref: 'Products'
    }],
    addresses: [
        {
            city: String,
            phone: String,
            street: String
        }
    ],
    passwordCreatedAt: Date
}, { timestamps: true, versionKey: false })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})
export const Users = model('Users', userSchema)