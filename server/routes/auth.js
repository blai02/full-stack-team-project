const express = require('express');
const router = express.Router();
const { login, signup } = require('../handlers/auth');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
