const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    inventory: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;