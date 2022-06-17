const express = require('express');
const router = express.Router();

// home
router.use(require('./pages/home.router'));

// auth
router.use('/auth', require('./pages/auth/register.router'));   // register

module.exports = router;