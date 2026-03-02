const express = require('express');
const { addToCart, fetchItemsByUser, deleteFromCart, updateCart } = require('../Controller/Cart');

const router = express.Router();

router.post('/', addToCart)
    .get('/', fetchItemsByUser) 
    .delete('/:id', deleteFromCart)
    .patch('/:id', updateCart);

exports.router = router;   