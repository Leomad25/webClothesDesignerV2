const express = require('express');
const path = require('path');
const device = require('express-device');
//const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const favicon = require('serve-favicon');
const http = require('http');

// Initializations
const app =  express();
const server = http.createServer(app);

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(device.capture());
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
//app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variable
app.use(async (req, res, next) => {
    app.locals.user = req.user;
    /*
    if (req.user) {
        const avatar = await getAvatarFilename(req.user.iduser);
        if (avatar) req.avatar = avatar;
        req.permit = await getPermits(req);
    }
    */
    next();
});

// Routes
app.use(require('./router/index.router'));
app.use(express.static(path.join(__dirname, 'public')));    // Public
//app.use(express.static(path.join(__dirname, 'upload')));  // Upload
const notFound = require('./controller/pageNotFound.controller');
app.use(notFound.notFound);  // Route notFound

// Starting server
server.listen(app.get('port'), async function() {
    console.log("Server runing");
    console.log("listening on *:" + app.get('port'));
});