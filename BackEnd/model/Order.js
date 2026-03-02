const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    subtotal: { type: Number },
    totalItem: { type: Number },
    paymentMethod: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    // --- NEW FIELDS FOR ADMIN ---
    status: { type: String, default: 'pending' }, 
    createdAt: { type: Date, default: Date.now }
});

const virtual = orderSchema.virtual('id');

virtual.get(function () {
    return this._id;
})

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

exports.Order = mongoose.model('Order', orderSchema)