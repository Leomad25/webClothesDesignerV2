const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const mailer = require('../keys.js').mailer;

const nodeMailerExport = {};

const transporter = nodemailer.transporter = nodemailer.createTransport(mailer);

transporter.use('compile', hbs({
    viewEngine: {
        defaultLayout: 'mailer',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        extname: '.hbs'
    },
    viewPath: path.join(__dirname, '../views/emails'),
    extName: '.hbs'
}));

nodeMailerExport.verify = () => {
    transporter.verify().then (() => {
        console.log('Ready to send mails');
    });
}

nodeMailerExport.getEmail = require('./helpers/emails');

nodeMailerExport.sendMail = async function(message) {
    await transporter.sendMail(message, (err) => {
        if (err) {
            console.log('error: ', err);
        } else {
            console.log('mensaje enviado');
        }
    });
}

module.exports = nodeMailerExport;