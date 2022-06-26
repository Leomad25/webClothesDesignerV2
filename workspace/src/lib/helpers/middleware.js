const flashMessage = require('../../strings/flash').middleware;

module.exports = {
    auth: {
        isLoggedIn: (req, res, next) => {
            if (req.isAuthenticated()) return next();
            return res.redirect('/auth/login', flashMessage.auth.needUnlogin);
        },
        isNotLoggedIn: (req, res, next) => {
            if (!(req.isAuthenticated())) return next();
            req.flash('full_error', )
            return res.redirect('/');
        }
    }
}