module.exports = {
    pageNotFound: {
        stylesheet: 'pageNotFound',
        script: 'pageNotFound',
        strings: require('../../strings/pages/es').pageNotFound
    },
    home: {
        stylesheet: 'home',
        script: 'home',
        //strings: require('../../strings/pages/es').home
    },
    auth: {
        register: {
            stylesheet: 'auth/register',
            script: 'auth/register',
            strings: require('../../strings/pages/es').auth
        },
    }
}