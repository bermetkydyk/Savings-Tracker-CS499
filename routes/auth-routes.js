const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('http://localhost:3000/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get(
    '/google/redirect', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('http://localhost:3000/summary');
    }   
);

// Testing API
// http://localhost:5000/auth/api/current_user
router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
