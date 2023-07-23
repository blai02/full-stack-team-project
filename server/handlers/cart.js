const db = require('../models');

function returnCart(user) {
  let subtotal = 0;
  user.cart.forEach((item) => {
    subtotal += item.count * item.product.price;
  });
  let discount = 0;
  if (user.discounts?.size) {
    discount = -.2 * subtotal;
  }
  let tax = 0.1 * (subtotal + discount);
  let total = subtotal + discount + tax;
  return {
    cart: user.cart,
    discountCodes: user.discounts === undefined ? [] : user.discounts,
    subtotal,
    discount,
    tax,
    total
  }
}

exports.getCart = async function (req, res, next) {
  try {
    const user = await db.User.findById(res.locals.userId).populate('cart.$*.product');
    return res.json(returnCart(user));
  } catch (err) {
    return next(err);
  }
};

exports.updateCart = async function (req, res, next) {
  try {
    const user = await db.User.findById(res.locals.userId);
    for (const productId in req.body) {
      const count = req.body[productId];
      if (!Number.isInteger(count) || count < 0) {
        return next({
          status: 400,
          message: 'count must be an integer'
        });
      }
      if (count === 0) {
        user.cart.delete(productId);
      } else {
        user.cart.set(productId, {
          product: productId,
          count
        });
      }
  
    }
    await user.save();
    await user.populate('cart.$*.product');
    return res.json(returnCart(user));
  } catch (err) {
    return next(err);
  }
};

exports.applyDiscount = async function (req, res, next) {
  try {
    const user = await db.User.findById(res.locals.userId);
    if (req.body === 'chuwa') {
      if (!user.discounts) {
        user.discounts = [];
      }
      if (!user.discounts.includes('chuwa')) {
        user.discounts.push('chuwa')
      }
      await user.save();
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
}

exports.removeDiscount = async function (req, res, next) {
  try {
    const user = await db.User.findById(res.locals.userId);
    if (!user.discounts) {
      return res.sendStatus(404);
    }
    const index = user.discounts.indexOf(req.body);
    if (index !== -1) {
      user.discounts.splice(index, 1);
      await user.save();
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
}