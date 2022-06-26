const express = require('express');
const router = express.Router();

router.get('/logout', require('../../../lib/helpers/middleware').auth.isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;