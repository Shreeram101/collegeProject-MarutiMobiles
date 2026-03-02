const { Order } = require("../model/Order");
const { Product } = require('../model/ProductModel')

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);

    // Update stock
    for (let item of order.items) {
        let product = await Product.findOne({ _id: item.product.id });
        if (product) {
            product.$inc('stock', -1 * item.qty);
            await product.save();
        }
    }
    try {
        const doc = await order.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.fetchOrdersByUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Find orders for specific user and sort by newest
        const orders = await Order.find({ user: id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchAllOrders = async (req, res) => {
    // Admin: Find ALL orders
    let query = Order.find({});
    
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    } else {
        query = query.sort({ createdAt: -1 });
    }

    try {
        const orders = await query.exec();
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
}