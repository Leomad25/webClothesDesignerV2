const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/home', require('../../lib/helpers/pageConf').home);
});

module.exports = router;