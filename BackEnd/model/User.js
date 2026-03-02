const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    addresses: { type: [Schema.Types.Mixed] },
    name: { type: String },
})

const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
});

userSchema.methods.verifyPassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

const User = mongoose.model('User', userSchema);

module.exports = User;