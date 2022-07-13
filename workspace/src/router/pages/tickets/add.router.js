const express = require('express');
const router = express.Router();

const controller = require('../../../controller/tickets/add.controller');
const middleware = require('../../../lib/helpers/middleware');
const multer = require('../../../lib/multer');

router.get('/add', middleware.auth.isLoggedIn, middleware.activation.isActivate, async (req, res) => {
    const pageConf = require('../../../lib/helpers/pageConf')(req, 'tickets', 'add');
    const worktype = await controller.getListOfWorksTypes();
    if (worktype) pageConf.worktype = worktype;
    res.render('pages/tickets/add', pageConf);
});

router.post('/add', middleware.auth.isLoggedIn, middleware.activation.isActivate, (req, res) => {
    multer.tickets.array('ref-images', 8)(req, res, (err) => {
        if (err) {
            req.flash('full_error', controller.getFlashMessage().error.storageImageFailure);
            res.redirect('/tickets/add');
        } else {
            const { type, desc } = req.body;
            const uuid = require('uuid').v4();
            if (controller.createNewTickets(uuid, req.user.iduser, type, desc, req.files)) {
                res.redirect('/tickets/ticket/' + uuid);
            } else {
                req.flash('full_error', controller.getFlashMessage().error.failureToCreateTicket)
                res.redirect('/tickets/add');
            }
        }
    });
});

module.exports = router;