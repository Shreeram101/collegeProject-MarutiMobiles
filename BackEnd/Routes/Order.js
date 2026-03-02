const express = require('express');
const { createOrder, fetchOrdersByUser, fetchAllOrders, updateOrder } = require('../Controller/Order');

const router = express.Router();

router.post('/', createOrder)
      .get('/own/:id', fetchOrdersByUser) // Unique path for User Orders
      .get('/', fetchAllOrders)           // Root path for Admin (All Orders)
      .patch('/:id', updateOrder);        // Path for updating status

exports.router = router;