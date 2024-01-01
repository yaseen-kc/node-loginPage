// Block 1: Import required modules
const express = require('express');
const router = express.Router();

// Block 2: Set up credentials for authentication
const credential = {
    username: 'admin',
    password: 'admin123'
};

// Block 3: Handle login POST request
router.post('/login', (req, res) => {
    // Check if provided username and password match credentials
    if (req.body.username == credential.username && req.body.password == credential.password) {
        // If matched, set user in session and redirect to dashboard
        req.session.user = req.body.username;
        res.redirect('/route/dashboard');
    } else {
        // If not matched, render login page with error message
        res.render('base', { title: 'Login System', error: 'Incorrect username or password' });
    }
});

// Block 4: Handle dashboard GET request
router.get('/dashboard', (req, res) => {
    // Check if user is authenticated, render dashboard; otherwise, redirect to login
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

// Block 5: Handle logout POST request
router.post('/logout', (req, res) => {
    // Destroy session on logout
    req.session.destroy(function (err) {
        if (err) {
            // If error during logout, log error and send JSON response
            console.log(err);
            res.json({ success: false, message: 'Error during logout' });
        } else {
            // If logout successful, send JSON response
            res.json({ success: true, message: 'Logout Successfully' });
        }
    });
});

// Block 6: Export the router for use in other parts of the application
module.exports = router;
