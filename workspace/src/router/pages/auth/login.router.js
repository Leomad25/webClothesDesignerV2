const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('pages/auth/login', require('../../../lib/helpers/pageConf')(req).auth.login);
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

module.exports = router;