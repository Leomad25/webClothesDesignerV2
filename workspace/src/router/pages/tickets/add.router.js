const express = require('express');
const router = express.Router();

const controller = require('../../../controller/tickets/add.controller');
const middleware = require('../../../lib/helpers/middleware')

/*
router.get('/add', middleware.auth.isLoggedIn, middleware.activation.isActivate, (req, res) => {
    res.render('pages/tickets/add', require('../../../lib/helpers/pageConf')(req, 'tickets', 'add'));
});
*/

router.get('/add', (req, res) => {
    res.render('pages/tickets/add', require('../../../lib/helpers/pageConf')(req, 'tickets', 'add'));
});

module.exports = router;