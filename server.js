// Block 1: Import required modules
const express = require('express');
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

// Block 2: Import router module
const router = require('./router');

// Block 3: Create an Express application instance
const app = express();

// Block 4: Set up the port for the server
const port = process.env.PORT || 3000;

// Block 5: Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Block 6: Set the view engine to EJS
app.set('view engine', 'ejs');

// Block 7: Configure session middleware
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// Block 8: Use the router for routes starting with '/route'
app.use('/route', router);

// Block 9: Define a route for the home page
app.get('/', (req, res) => {
    res.render('base', { title: 'Login System' });
});

// Block 10: Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
