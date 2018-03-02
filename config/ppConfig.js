var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// Passport "serializes" objects to make them easy to store in the session,
// converting the user to an identifier.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

// Passport "deserializes" objects by taking the user's serialization id from the
// session or cookie and looking it up in the database
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

// Set up the local auth strategy...
//  - Set which fields should be used as credentials.
//  - Retrieve the model and check its hash with the submitted password.
//  - Return the user model if successful, false if it fails.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: {email: email}
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
