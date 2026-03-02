const express = require('express');
const { addToWishlist, fetchWishlistByUser, deleteFromWishlist } = require('../Controller/Wishlist'); 

const router = express.Router();

router.post("/", addToWishlist)
      .get("/", fetchWishlistByUser)
      .delete("/:id", deleteFromWishlist); 

exports.router = router;