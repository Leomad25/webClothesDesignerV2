const express = require('express');
const router = express.Router();

const middleware = require('../../../lib/helpers/middleware');
const controller = require('../../../controller/orders/tickets.controller');

router.get('/tickets', middleware.auth.isLoggedIn, middleware.activation.isActivate, middleware.permissions.level.isWorker, async (req, res) => {
    const pageConf = require('../../../lib/helpers/pageConf')(req, 'orders', 'tickets');
    const worktype = await controller.getListOfWorksTypes();
    if (worktype) pageConf.worktype = worktype;
    pageConf.tickets = {};
    const ticketsList = await controller.getTicketsList(req);
    if (ticketsList.available) pageConf.tickets.available = ticketsList.available;
    if (ticketsList.requested) pageConf.tickets.requested = ticketsList.requested;
    if (pageConf.tickets.available) await controller.getImagesOfTickets(pageConf.tickets.available);
    if (pageConf.tickets.requested) await controller.getImagesOfTickets(pageConf.tickets.requested);
    res.render('pages/orders/tickets', pageConf);
});

module.exports = router;