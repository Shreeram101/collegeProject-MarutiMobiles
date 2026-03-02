const express = require('express');
const { createProducts, fetchAllProducts, updateProduct, editProduct, deleteProduct, fetchProductById } = require('../Controller/Product');
const multer = require('multer');

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, __dirname + '/../../Frontend/src/uploads') 
  },
 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const router = express.Router();

router.post('/insertproduct', upload.single('avatar'), createProducts)
  .get('/', fetchAllProducts)
  .get('/:id', fetchProductById)
  .get('/updateproduct/:id', updateProduct)
  .post('/editproduct/:id', editProduct)
  .get('/deleteproduct/:id', deleteProduct)

exports.router = router;