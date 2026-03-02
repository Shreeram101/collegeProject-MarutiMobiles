const mongoose = require('mongoose');
const { Order } = require('./model/Order');
const { Product } = require('./model/ProductModel');
// FIX: Remove curly braces {} because User.js uses module.exports
const User = require('./model/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/SamsungProject';

const seedOrders = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to Database...');

        // 1. Get a User (or create a dummy one)
        let user = await User.findOne({});
        if (!user) {
            console.log('⚠️ No users found. Creating a dummy user...');
            user = await User.create({
                email: 'admin@test.com',
                password: 'password',
                role: 'admin',
                addresses: []
            });
        }

        // 2. Get Products
        const products = await Product.find({});
        if (products.length === 0) {
            console.log('❌ No products found. Run seed.js first!');
            process.exit(1);
        }

        // 3. Clear existing orders (Optional)
        await Order.deleteMany({});
        console.log('🧹 Cleared old orders...');

        // 4. Create Dummy Orders
        const ordersData = [
            {
                status: 'pending',
                paymentMethod: 'card',
                selectedAddress: { fullname: 'John Doe', streetaddress: '123 Main St', city: 'New York', state: 'NY', Pincode: '10001', phone: '1234567890' },
                items: [{ product: products[0], qty: 1 }, { product: products[1], qty: 2 }]
            },
            {
                status: 'dispatched',
                paymentMethod: 'cash',
                selectedAddress: { fullname: 'Jane Smith', streetaddress: '456 Market Ave', city: 'San Francisco', state: 'CA', Pincode: '94105', phone: '0987654321' },
                items: [{ product: products[2], qty: 1 }]
            },
            {
                status: 'delivered',
                paymentMethod: 'card',
                selectedAddress: { fullname: 'Alice Johnson', streetaddress: '789 Broadway', city: 'Chicago', state: 'IL', Pincode: '60614', phone: '5551234567' },
                items: [{ product: products[0], qty: 1 }]
            },
            {
                status: 'cancelled',
                paymentMethod: 'card',
                selectedAddress: { fullname: 'Bob Brown', streetaddress: '321 Elm St', city: 'Austin', state: 'TX', Pincode: '73301', phone: '4449876543' },
                items: [{ product: products[3], qty: 1 }, { product: products[4], qty: 1 }]
            },
            {
                status: 'pending',
                paymentMethod: 'cash',
                selectedAddress: { fullname: 'Charlie Davis', streetaddress: '654 Pine Rd', city: 'Seattle', state: 'WA', Pincode: '98101', phone: '2223334444' },
                items: [{ product: products[1], qty: 3 }]
            }
        ];

        // Calculate totals and save
        for (let orderData of ordersData) {
            let subtotal = 0;
            let totalItem = 0;

            // Ensure product exists before adding
            const validItems = orderData.items.filter(item => item.product);

            if (validItems.length > 0) {
                validItems.forEach(item => {
                    subtotal += item.product.price * item.qty;
                    totalItem += item.qty;
                });

                await Order.create({
                    ...orderData,
                    items: validItems,
                    user: user._id,
                    subtotal,
                    totalItem
                });
            }
        }

        console.log('✅ Successfully seeded 5 Orders!');
        mongoose.disconnect();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedOrders();