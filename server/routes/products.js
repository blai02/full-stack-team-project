const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../handlers/products');
const { validateUser } = require('../middleware/auth');

router.route('').get(getProducts);
router.route('/:product_id').get(getProduct);

router.route('').post(validateUser, createProduct);
router.route('/:product_id').put(validateUser, updateProduct).delete(validateUser, deleteProduct);

module.exports = router;