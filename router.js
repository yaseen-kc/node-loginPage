const express = require('express');
const router = express.Router();

const credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
};

router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    } else {
        res.end('Invalid Credentials');
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.send('Unauthorized User');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            // Redirect to the login page after logout
            res.redirect('/');
            // res.render('base', { title: "Express", logout: "Logout Successfully" })

        }
    });
});

module.exports = router;