module.exports = function(req, param1, param2, param3) {
    const flash = require('../helpers/flash')(req);

    if (param1 == 'pageNotFound') return {
        stylesheet: 'pageNotFound',
        script: 'pageNotFound',
        strings: require('../../strings/pages').pageNotFound
    }

    if (param1 == 'home') return {
        stylesheet: 'home',
        script: 'home',
        //strings: require('../../strings/pages').home,
        flash
    }
    
    if (param1 == 'auth') {
        if (param2 == 'register') return {
            stylesheet: 'auth',
            //script: 'auth/register',
            strings: require('../../strings/pages').auth.register,
            flash
        }
        if (param2 == 'login') return {
            stylesheet: 'auth',
            //script: 'auth/register',
            strings: require('../../strings/pages').auth.login,
            flash
        }
        if (param2 == 'activation') return {
            stylesheet: 'auth',
            //script: 'auth/register',
            strings: require('../../strings/pages').auth.activation,
            email: req.user.email,
            flash
        }
    }

    if (param1 == 'tickets') {
        if (param2 == 'add') return {
            stylesheet: 'tickets/add',
            //script: 'auth/register',
            strings: require('../../strings/pages').tickets.add,
            flash
        }
    }

    if (param1 == 'orders') {
        if (param2 == 'tickets') return {
            stylesheet: 'orders/tickets',
            script: 'orders/tickets',
            strings: require('../../strings/pages').orders.tickets,
            flash
        }
    }
}