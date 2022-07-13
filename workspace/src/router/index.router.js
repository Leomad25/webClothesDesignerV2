const express = require('express');
const router = express.Router();

// home
router.use(require('./pages/home.router'));

// auth
router.use('/auth', require('./pages/auth/register.router'));   // register
router.use('/auth', require('./pages/auth/login.router'));      // login
router.use('/auth', require('./pages/auth/logout.router'));     // logout
router.use('/auth', require('./pages/auth/activation.router')); // activation

// tickets
router.use('/tickets', require('./pages/tickets/tickets.router')) // panel
router.use('/tickets', require('./pages/tickets/add.router'));   // add

// orders
router.use('/orders', require('./pages/orders/tickets.router')); // tickets

module.exports = router;