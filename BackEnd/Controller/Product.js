const { Product } = require("../model/ProductModel")

exports.createProducts = async (req, res) => {
 
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        category: req.body.category,
        stock: req.body.stock,
        avatar: req.file.filename
    })

    try {
        const doc = await product.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err)
    }

}

exports.fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.fetchProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.editProduct = async (req, res) => {
    try {
        const editedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(editedProduct);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Product.findByIdAndDelete(id);
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}