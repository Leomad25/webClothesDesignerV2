const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

const database = require('./database/users.database');
const encrypt = require('./helpers/encrypt');
const controllerRegister = require('../controller/auth/register.controller');
const controllerLogin = require('../controller/auth/login.controller');

passport.use('local.singup', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if ((await database.select.byEmail(email)).length > 0) done(null, false, req.flash('full_error', controllerRegister.getFlashMessage().error.emailIsRegistered));
    const { firstname, lastname, gender} = req.body;
    const newUser = {
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        gender,
        email: email.toLowerCase(),
        password: await encrypt.encryptPassword(password)
    }
    const result = await database.insert.perObj(newUser);
    console.log(result);
    if (result.affectedRows > 0) {
        newUser.iduser = result.insertId;
        done(null, newUser);
    } else done(null, false, req.flash('full_error', controllerRegister.getFlashMessage().error.dataNotStoraged));
}));

passport.use('local.login', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const result = await database.select.byEmail(email);
    if (result.length == 0) return done(null, false, req.flash('full_error', controllerLogin.getFlashMessage().error.emailNotRegistered));
    if (!(await encrypt.matchPassword(password, result[0].password))) return done(null, false, req.flash('full_error', controllerLogin.getFlashMessage().error.passwordIsInscorrect));
    return done(null, result[0]);
}));

passport.serializeUser((user, done) => {
    done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    const user = await database.select.byId(iduser);
    if (user.length == 0) return done(null, false, req.flash(require('../strings/flash').auth.deserialize));
    done(null, user[0]);
});