const express = require('express');
const router = express.Router();

// home
router.use(require('./pages/home.router'));

// auth
router.use('/auth', require('./pages/auth/register.router'));   // register
router.use('/auth', require('./pages/auth/login.router'));      // login

module.exports = router;