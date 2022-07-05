const express = require('express');
const router = express.Router();

const path = require('path');
const middleware = require('../lib/helpers/middleware');

const privateMiddleware = {
    isEnabledAccess: async (req, res, next) => {
        const { id } = req.params;
        if (id == req.user.iduser) return next();
        if (await require('../lib/helpers/permissions').isHigherThan(req, require('../keys').permissions.worker)) return next();
        req.flash('full_error', require('../strings/flash').middleware.permissions.youDontHaveAccessTo(req));
        res.redirect('/');
    },
    getResource: (req, res, next) => {
        express.static(path.join(__dirname, '../uploads/tickets/', req.params.id))(req, res, next);
    }
}

router.use('/uploads/tickets/:id', middleware.auth.isLoggedIn, middleware.permissions.block.isNotBlocked, privateMiddleware.isEnabledAccess, privateMiddleware.getResource);

module.exports = router;