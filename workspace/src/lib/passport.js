const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const database = require('./helpers/sentences/users.database');
const encrypt = require('./helpers/encrypt');
const controller = require('../controller/auth/register.controller');

passport.use('local.singup', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if ((await database.select.byEmail(email)).length > 0) done(null, false, req.flash('full_error', controller.getFlashMessage().full.error.emailIsRegistered));
    const { firstname, lastname, gender} = req.body;
    const newUser = {
        firstname,
        lastname,
        gender,
        email,
        password: await encrypt.encryptPassword(password)
    }
    const result = await database.insert.perObj(newUser);
    console.log(result);
    if (result.affectedRows > 0) {
        newUser.iduser = result.insertId;
        done(null, newUser);
    } else done(null, false, req.flash('full_error', controller.getFlashMessage().full.error.dataNotStoraged));
}));

passport.use('local.login', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}, async (email, password, done) => {

}));

passport.serializeUser((user, done) => {
    done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    done(null, (await database.select.byId(iduser))[0]);
});