const flashMessage = require('../../strings/flash').middleware;
const levels = require('../../keys').permissions;

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
    permissions: {
        block: {
            isNotBlocked: async (req, res, next) => {
                const select = await require('../database/permissions.database').select(req.user.iduser);
                if (select.length > 0 && select[0].blocked == 0) return next();
                req.flash('full_error', flashMessage.permissions.yorAccountIsBlocked);
                return res.redirect('/');
            }
        },
        level: {
            isClient: async (req, res, next) => {
                const select = await require('../database/permissions.database').select(req.user.iduser);
                if (select.length > 0 && select[0].level >= levels.client) return next();
                req.flash('full_error', flashMessage.permissions.youDontHaveAccessTo(req));
                return res.redirect('/');
            },
            isWorker: async (req, res, next) => {
                const select = await require('../database/permissions.database').select(req.user.iduser);
                if (select.length > 0 && select[0].level >= levels.worker) return next();
                req.flash('full_error', flashMessage.permissions.youDontHaveAccessTo(req));
                return res.redirect('/');
            },
            isAdministrator: async (req, res, next) => {
                const select = await require('../database/permissions.database').select(req.user.iduser);
                if (select.length > 0 && select[0].level >= levels.administrator) return next();
                req.flash('full_error', flashMessage.permissions.youDontHaveAccessTo(req));
                return res.redirect('/');
            }
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
    },
    image: {
        haveAccess: async (req, res, next) => {

        }
    }
}