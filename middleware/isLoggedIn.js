function isLoggedIn(req, res, next) {
    console.log(req.user)
    if (!req.user) {
        req.flash('error', 'You must be signed in to access page');
        res.redirect('/resident/login');
    } else {
        next();
    }
}

module.exports = isLoggedIn;