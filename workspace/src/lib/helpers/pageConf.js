module.exports = function(req) {
    const flash = require('../helpers/flash')(req);
    return {
        pageNotFound: {
            stylesheet: 'pageNotFound',
            script: 'pageNotFound',
            strings: require('../../strings/pages').pageNotFound
        },
        home: {
            stylesheet: 'home',
            script: 'home',
            //strings: require('../../strings/pages').home,
            flash
        },
        auth: {
            register: {
                stylesheet: 'auth/register',
                script: 'auth/register',
                strings: require('../../strings/pages').auth,
                flash
            },
        }
    }
}