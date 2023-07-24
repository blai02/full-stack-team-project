const jwt = require('jsonwebtoken');
const db = require('../models');

// make sure we get the correct user - Authorization
exports.validateUser = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const user = await db.User.findById(decoded.id);
      res.locals.userId = user.id;
      res.locals.username = user.username;
      res.locals.isVendor = user.isVendor;
      return next();
    } else {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
};