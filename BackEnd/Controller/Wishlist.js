const { Wishlist } = require("../model/Wishlist");

exports.addToWishlist = async (req, res) => {
    const wishlist = new Wishlist({ ...req.body, user: req.body.user });
    try {
        const doc = await wishlist.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}

// YEH NAYA FUNCTION ADD KAREIN
exports.fetchWishlistByUser = async (req, res) => {
    const { user } = req.query;
    try {
        const wishlistItems = await Wishlist.find({ user: user }).populate('product');
        res.status(200).json(wishlistItems);
    } catch (err) {
        res.status(400).json(err);
    }
};


exports.deleteFromWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Wishlist.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};