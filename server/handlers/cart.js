const db = require('../models');

exports.getCart = async function (req, res, next) {
  try {
    const user = await db.User.findById(res.locals.userId).populate('cart.$*.product');
    return res.json(user.cart);
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
    const user = await db.User.findById(res.locals.userId);
    if (count === 0) {
      user.cart.delete(productId);
    } else {
      user.cart.set(productId, {
        product: productId,
        count
      });
    }
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};