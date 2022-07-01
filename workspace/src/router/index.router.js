const express = require('express');
const router = express.Router();

// home
router.use(require('./pages/home.router'));

// auth
router.use('/auth', require('./pages/auth/register.router'));   // register
router.use('/auth', require('./pages/auth/login.router'));      // login
router.use('/auth', require('./pages/auth/logout.router'));     // logout
router.use('/auth', require('./pages/auth/activation.router')); // activation

module.exports = router;