const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('pages/auth/register', require('../../../lib/helpers/pageConf').auth.register);
});

router.post('/register', (req, res) => {
    
});

module.exports = router;