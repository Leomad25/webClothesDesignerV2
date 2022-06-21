const remainder = require('../../keys').strings;

module.exports = {
    sendActivation: (email, key) => {
        return {
            from: '"' + remainder.mailer.nombre + '" <' + remainder.mailer.email + '>',
            to: email,
            subject: 'Validation Account Key',
            template: 'activationKey',
            context: {
                key,
                hosting: remainder.hosting,
                strings: require('../../strings/emails').activationKey
            }
        }
    }
}