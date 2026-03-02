const express = require('express');
const { createCategory, fetchAllCategory, updateCategory, editCategory, deleteCategory } = require('../Controller/Category');

const router = express.Router();

router.post('/insertcategory', createCategory)
    .get('/', fetchAllCategory)
    .get('/updatecategory/:id', updateCategory)
    .post('/editcategory/:id', editCategory)
    .get('/deletecategory/:id', deleteCategory)

exports.router = router;  