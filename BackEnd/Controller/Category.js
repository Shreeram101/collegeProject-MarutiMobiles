const { Category } = require("../model/Category")

exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    console.log(category);

    try {   
        const doc = await category.save();
        // res.status(201).json(doc);
        res.redirect('/')
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAllCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.editCategory = async (req, res) => {

    try {
        const editedCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
        console.log(editedCategory);
        res.status(200).json(editedCategory);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const categories = await Category.findByIdAndDelete(id);
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json(err)
    }
}