const db = require('../models');

exports.getProducts = async function (req, res, next) {
    try {
      const products = await db.Product.find().populate(
        'vendor',
        {
          username: true
        }
      );
      return res.json(products);
    } catch (err) {
      return next(err);
    }
};

exports.createProduct = async function (req, res, next) {
  try {
    if (!res.locals.isVendor) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
    const product = await db.Product.create({
      ...req.body,
      vendor: res.locals.userId,
    });
    await product.populate(
      'vendor',
      {
        username: true
      }
    );
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

exports.getProduct = async function (req, res, next) {
  try {
    const product = await db.Product.findById(req.params.product_id).populate(
      'vendor',
      {
        username: true
      }
    );
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

exports.updateProduct = async function (req, res, next) {
  try {
    const product = await db.Product.findById(req.params.product_id).populate(
      'vendor',
      {
        username: true
      }
    );
    if (product.vendor._id !== res.locals.userId) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
    product.name = req.body.name ?? product.name;
    product.imgUrl = req.body.imgUrl ?? product.imgUrl;
    product.category = req.body.category ?? product.category;
    product.description = req.body.description ?? product.description;
    product.inventory = req.body.inventory ?? product.inventory;
    product.price = req.body.price ?? product.price;
    await product.save();
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

exports.deleteProduct = async function (req, res, next) {
  try {
    const product = await db.Product.findByIdAndDelete(req.params.product_id).populate(
      'vendor',
      {
        username: true
      }
    );
    if (product.vendor._id !== res.locals.userId) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};