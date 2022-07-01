const flashMessage = require('../../strings/flash').middleware;

module.exports = {
    auth: {
        isLoggedIn: (req, res, next) => {
            if (req.isAuthenticated()) return next();
            req.flash('full_error', flashMessage.auth.needLogin);
            return res.redirect('/auth/login');
        },
        isNotLoggedIn: (req, res, next) => {
            if (!(req.isAuthenticated())) return next();
            req.flash('full_error', flashMessage.auth.needUnlogin);
            return res.redirect('/');
        }
    },
    activation: {
        isActivate: async (req, res, next) => {
            const database = await require('./database/users.database').select.byId(req.user.iduser);
            if ((database.length > 0) && (database[0].active == 1)) return next();
            req.flash('full_error', flashMessage.active.needActiveAccount);
            return res.redirect('/auth/active');
        },
        isNotActivate: async (req, res, next) => {
            const database = await require('./database/users.database').select.byId(req.user.iduser);
            if ((database.length > 0) && (database[0].active == 0)) return next();
            req.flash('full_error', flashMessage.active.yourAccountAlreadyActive);
            return res.redirect('/');
        }
    }
}