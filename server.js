const express = require('express');
const path = require('path');
// const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const nocache = require("nocache");
const flash = require("express-flash");

const router = require('./router');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

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

// Define routes
app.use('/route', router);

// Redirect root to the login page
app.get('/', (req, res) => {
    res.render('base', { title: 'Login System' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
