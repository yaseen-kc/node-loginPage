// Block 1: Import required modules
const express = require('express');
const path = require('path');
//! const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const nocache = require("nocache");
const flash = require("express-flash");

// Block 2: Import router module
const router = require('./router');

// Block 3: Create an Express application instance
const app = express();

const port = 3000;

//! app.use(bodyparser.json());
//! app.use(bodyparser.urlencoded({ extended: true }));

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


//implementing middleware

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));


app.use(nocache()); ``
app.use(flash());

//middleware express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
