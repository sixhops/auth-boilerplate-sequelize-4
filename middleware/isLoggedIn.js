// Middleware to verify that user is authorized to access protected routes
module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page!!!');
    res.redirect('/auth/login');
  } else {
    next();
  }
}
