const db = require('../models');

exports.getCart = async function (req, res, next) {
  try {
    const { cart } = await db.User.findById(res.locals.userId).populate('cart.$*product');
    return res.json(cart);
  } catch (err) {
    return next(err);
  }
};

exports.updateCart = async function (req, res, next) {
  try {
    const { productId, count } = req.body;
    if (!Number.isInteger(count) || count < 0) {
      return next({
        status: 400,
        message: 'count must be an integer'
      });
    }
    const { cart } = await db.User.findById(res.locals.userId);
    if (count === 0) {
      cart.delete(productId);
    } else {
      cart.set(productId, {
        product: productId,
        count
      });
    }
    await cart.save();
    return res.json(cart);
  } catch (err) {
    return next(err);
  }
};