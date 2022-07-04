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
            console.log('Error: ', err);
        } else {
            console.log(req.files);
        }
    });
});

module.exports = router;