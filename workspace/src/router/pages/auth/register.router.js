const express = require('express');
const router = express.Router();

const controller = require('../../../controller/auth/register.controller');
const passport = require('passport');

router.get('/register', require('../../../lib/helpers/middleware').auth.isNotLoggedIn, (req, res) => {
    const { firstname, lastname, gender, email } = req.query;
    let pageConf = require('../../../lib/helpers/pageConf')(req).auth.register;
    if (firstname || lastname || gender || email) {
        const preload = {}
        if (firstname) preload.firstname = firstname;
        if (lastname) preload.lastname = lastname;
        if (gender) {
            preload.gender = {}
            if (gender === 'F') preload.gender.female = true;
            if (gender === 'M') preload.gender.male = true;
        };
        if (email) preload.email = email;
        pageConf.preload = preload;
    }
    res.render('pages/auth/register', pageConf);
});

router.post('/register', controller.validateFields, passport.authenticate('local.singup', {
    successRedirect: '/',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

module.exports = router;