const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
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

router.post('/register', (req, res) => {
    const { firstname, lastname, gender, email, password, confirm } = req.body;
    const controller = require('../../../controller/auth/register.controller');
    const flashMessage = controller.getFlashMessage();
    if (gender == 'F' || gender == 'M') {
        if (password.toLowerCase() == confirm.toLowerCase()) {
            return controller.registerNewUser(req, res, flashMessage);
        } else req.flash('full_error', flashMessage.full.error.passwordNotMatch);
    } else req.flash('full_error', flashMessage.full.error.genderNotSelected);
    return res.redirect('/auth/register?' +
    'firstname=' + firstname +
    '&lastname=' + lastname +
    '&gender=' + gender +
    '&email=' + email);
});

module.exports = router;