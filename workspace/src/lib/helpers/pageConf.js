module.exports = function(req) {
    const flash = require('../helpers/flash')(req);
    return {
        pageNotFound: {
            stylesheet: 'pageNotFound',
            script: 'pageNotFound',
            strings: require('../../strings/pages/es').pageNotFound
        },
        home: {
            stylesheet: 'home',
            script: 'home',
            //strings: require('../../strings/pages/es').home,
            flash
        },
        auth: {
            register: {
                stylesheet: 'auth/register',
                script: 'auth/register',
                strings: require('../../strings/pages/es').auth,
                flash
            },
        }
    }
}