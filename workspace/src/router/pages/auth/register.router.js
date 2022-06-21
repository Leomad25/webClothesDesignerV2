const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('pages/auth/register', require('../../../lib/helpers/pageConf')(req).auth.register);
});

router.post('/register', (req, res) => {
    const { firstname, lastname, gender, email, password, confirm } = req.body;
    const controller = require('../../../controller/auth/register.controller');
    const flashMessage = controller.getFlashMessage();
    if (gender == 'F' || gender == 'M') {
        if (password.toLowerCase() == confirm.toLowerCase()) {
        
        } else req.flash('full_error', flashMessage.full.error.passwordNotMatch);
    } else req.flash('full_error', flashMessage.full.error.genderNotSelected);
    res.redirect('/auth/register?' +
    'firstname=' + firstname +
    '&lastname=' + lastname +
    '&gender=' + gender +
    '&email=' + email);
});

module.exports = router;