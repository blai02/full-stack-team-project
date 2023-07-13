const express = require('express');
const router = express.Router();
const {
  getCart,
  updateCart,
} = require('../handlers/cart');
const { validateUser } = require('../middleware/auth');

router.route('').get(validateUser, getCart).put(validateUser, updateCart);

module.exports = router;