var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// GET /auth/signup - returns the signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// POST /auth/signup - route to create the user
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // user was created
      console.log('User created');
      // use passport to automatically log the user in
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // email already exists in db
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('An error occurred: ', error.message);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

// GET /auth/login - returns the login form
router.get('/login', function(req, res) {
  res.render('auth/login');
});

// POST /auth/login - route to log the user in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You have logged in!',
  failureFlash: 'Invalid username and/or password',
  failureRedirect: '/auth/login'
}));

// GET /auth/logout - route to log the user out
router.get('/logout', function(req, res) {
  // passport logout() removes req.user and clears the session
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

module.exports = router;
