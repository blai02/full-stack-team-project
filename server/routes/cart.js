const express = require('express');
const router = express.Router();
const {
  getCart,
  updateCart,
  applyDiscount,
  removeDiscount
} = require('../handlers/cart');
const { validateUser } = require('../middleware/auth');

router.route('').get(validateUser, getCart).put(validateUser, updateCart);

router.route('discounts').post(validateUser, applyDiscount).delete(validateUser, removeDiscount);

module.exports = router;