const express = require('express');
const router = express.Router();

const middleware = require('../../../lib/helpers/middleware');
const controller = require('../../../controller/tickets/tickets.controller');

router.get('/tickets', middleware.auth.isLoggedIn, middleware.activation.isActivate, async (req, res) => {
    const pageConf = require('../../../lib/helpers/pageConf')(req, 'tickets', 'tickets');
    pageConf.tickets = await controller.getMyTickets(req);
    res.render('pages/tickets/tickets', pageConf);
});

module.exports = router;