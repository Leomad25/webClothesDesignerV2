const express = require('express');
const router = express.Router();

const middleware = require('../../../lib/helpers/middleware');
const controller = require('../../../controller/auth/activation.controller');

router.get('/sendActivationKey', middleware.auth.isLoggedIn, middleware.activation.isNotActivate, async (req, res) => {
    const validation = await controller.haveActiveKey(req)
    if (validation) controller.deleteActivationKey(req);
    await controller.createActiveKey(req, res);
});

router.get('/activation', middleware.auth.isLoggedIn, middleware.activation.isNotActivate, (req, res) => {
    res.render('pages/auth/activation', require('../../../lib/helpers/pageConf')(req, 'auth', 'activation'));
});

router.post('/activation', middleware.auth.isLoggedIn, middleware.activation.isNotActivate, (req, res) => {
    const { key } = req.body;
    if (key) return res.redirect('/auth/activation/' + key);
    res.redirect('/auth/activation');
});

router.get('/activation/:key', middleware.auth.isLoggedIn, middleware.activation.isNotActivate, async (req, res) => {
    if (!(req.params.key) || req.params.key.length == 0) return res.redirect('/auth/activation');
    if (await controller.haveActiveKey(req)) return controller.validateActiveKey(req, res);
    return controller.createActiveKey(req, res);
});

module.exports = router;