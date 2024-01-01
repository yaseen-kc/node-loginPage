const express = require('express');
const router = express.Router();

const credential = {
    username: 'admin',
    password: 'admin123'
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
            // Clear the session
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ success: true, message: 'Logout Successfully' });
        }
    });
});




router.get("/", (req, res) => {
    if (!req.session.user) {
        res.render("base", { title: "Login Page", message: req.flash() });
    } else {
        res.redirect("/dashboard");
    }
});

module.exports = router;
