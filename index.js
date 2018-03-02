require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var isLoggedIn = require('./middleware/isLoggedIn');

// Initialize the app
var app = express();
// Set the view engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// Configure logging
app.use(require('morgan')('dev'));
// Configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configure the express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Setup flash messages (connect-flash)
app.use(flash());

// Link up passport to the session
app.use(passport.initialize());
app.use(passport.session());

// Before every route, attach the flash messages and current user to res.locals
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// GET / (root) route
app.get('/', function(req, res) {
  res.render('index');
});

// GET /profile route
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

// Include the /auth routes
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
