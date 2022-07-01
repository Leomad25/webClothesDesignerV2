const database = require('../../lib/helpers/database/activations.database');

async function insertToDatabase(req, res, key) {
    const keyEnc = await require('../../lib/helpers/encrypt').encryptPassword(key);
    const datetime = require('moment')(new Date()).format("YYYY-MM-DD HH:mm:ss");
    try {
        return await database.insert(req.user.iduser, keyEnc, datetime)
    } catch (e) {
        req.flash('full_error', require('../../strings/flash').auth.activation.error.NotStoreActivationKey);
        res.redirect('/auth/activation');
        return undefined;
    }
}

async function expiredActivationKey(req, res) {
    const flashMessage = require('../../strings/flash').auth;
    const key = require('uuid').v4();
    await database.delete(req.user.iduser);
    let insert = await insertToDatabase(req, res, key);
    if (insert != undefined && (insert.affectedRows > 0)) {
        if (await require('../../lib/nodemailer').sendMail( require('../../lib/nodemailer').getEmail.sendActivation(req.user.email, key))) {
            req.flash('full_info', flashMessage.activation.info.expiredKey);
            res.redirect('/auth/activation');
        } else {
            await database.delete(req.user.iduser);
            req.flash('full_error', flashMessage.activation.error.emailDontSend(req.user.email));
            res.redirect('/auth/activation');
        }
    }
}

async function attemptsOversized(req, res) {
    const flashMessage = require('../../strings/flash').auth;
    const key = require('uuid').v4();
    await database.delete(req.user.iduser);
    let insert = await insertToDatabase(req, res, key);
    if (insert != undefined && (insert.affectedRows > 0)) {
        if (await require('../../lib/nodemailer').sendMail( require('../../lib/nodemailer').getEmail.sendActivation(req.user.email, key))) {
            req.flash('full_error', flashMessage.activation.error.exceededNumberOfAttempts);
            res.redirect('/auth/activation');
        } else {
            await database.delete(req.user.iduser);
            req.flash('full_error', flashMessage.activation.error.emailDontSend(req.user.email));
            res.redirect('/auth/activation');
        }
    }
}

async function validateSuccess(req, res) {
    await database.delete(req.user.iduser);
    if ((await require('../../lib/helpers/database/users.database').update.activeAccount(req.user.iduser)).affectedRows > 0) {
        req.flash('full_success', require('../../strings/flash').auth.activation.success.activateSuccess);
        res.redirect('/');
    } else {
        req.flash('full_error', require('../../strings/flash').auth.activation.error.activateError);
        res.redirect('/auth/activation');
    }
    
}

async function validateFailure(req, res) {
    await database.update.addAttempt(((await database.select(req.user.iduser))[0].attempts + 1), req.user.iduser);
    req.flash('full_error', require('../../strings/flash').auth.activation.error.keyDontMach);
    res.redirect('/auth/activation');
}

module.exports = {
    getFlashMessage: () => {
        return require('../../strings/flash').auth.activation;
    },
    haveActiveKey: async (req) => {
        if ((await database.select(req.user.iduser)).length > 0) return true;
        return false;
    },
    validateActiveKey: async (req, res) => {
        const key = req.params.key;
        const select = (await database.select(req.user.iduser))[0];
        if (require('moment')(select.createdate).add(1, 'days').diff(require('moment')(new Date())) > 0) {
            if (select.attempts < 3) {
                if (await require('../../lib/helpers/encrypt').matchPassword(key, select.key)) {
                    await validateSuccess(req, res)
                } else await validateFailure(req, res);
            } else await attemptsOversized(req, res);
        } else await expiredActivationKey(req, res);
    },
    createActiveKey: async (req, res) => {
        const flashMessage = require('../../strings/flash').auth;
        const key = require('uuid').v4();
        let insert = await insertToDatabase(req, res, key);
        if (insert != undefined && (insert.affectedRows > 0)) {
            if (await require('../../lib/nodemailer').sendMail( require('../../lib/nodemailer').getEmail.sendActivation(req.user.email, key))) {
                req.flash('full_success', flashMessage.activation.success.generatedActivationKey);
                res.redirect('/auth/activation');
            } else {
                await database.delete(req.user.iduser);
                req.flash('full_error', flashMessage.activation.error.emailDontSend(req.user.email));
                res.redirect('/auth/activation');
            }
        }
    },
    deleteActivationKey: async (req) => {
        database.delete(req.user.iduser);
    }
}