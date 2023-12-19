const express = require('express');
const router = express.Router();

const credential = {
    username: 'admin', // Change this to your predefined username
    password: 'admin123' // Change this to your predefined password
};

router.post('/login', (req, res) => {
    if (req.body.username == credential.username && req.body.password == credential.password) {
        req.session.user = req.body.username;
        res.redirect('/route/dashboard');
    } else {
        res.render('base', { title: 'Login System', error: 'Incorrect username or password' });
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Error during logout' });
        } else {
            res.json({ success: true, message: 'Logout Successfully' });
        }
    });
});

module.exports = router;
