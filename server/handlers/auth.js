const db = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async function (req, res, next) {
  try {
    // finding a user
    const user = await db.User.findOne({
      email: req.body.email
    });
    const { id, username, isVendor } = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {id, username, isVendor},
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        username,
        isVendor,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email / Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Email / Password.'
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, isVendor } = user;
    let token = await jwt.sign(
      {id, username, isVendor},
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
        username,
        isVendor,
        token
    });
  } catch (err) {
    // see what kind of error
    // if it is a certain error
    // responde with username/email already taken
    // otherwise just send back with 400

    // if there is already a user with that email
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.confirmemail = async function (req, res, next) {
  return res.sendStatus(200);
}

exports.changepassword = async function (req, res, next) {
  try {
    // finding a user
    const user = await db.User.findById(res.locals.userId);

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.oldPassword);

    if (isMatch) {
      user.password = req.body.newPassword;
      user.save();
      return res.sendStatus(200);
    } else {
      return next({
        status: 400,
        message: 'Invalid Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}