const express = require('express');
const router = express.Router();
const { login, signup, confirmemail, changepassword } = require('../handlers/auth');
const { validateUser } = require('../middleware/auth')

router.post('/login', login);
router.post('/signup', signup);
router.post('/confirmemail', confirmemail);
router.post('/changepassword', validateUser, changepassword);

module.exports = router;
