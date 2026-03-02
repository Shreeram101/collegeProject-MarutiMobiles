const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    avatar: { type: String, required: true }
})
 
const virtual = productSchema.virtual('id')

virtual.get(function () {
    return this._id;
})

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Product = mongoose.model('Product', productSchema)