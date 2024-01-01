const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const flash = require("express-flash");

const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();


//describing user details

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
};


app.set("view engine", "ejs");


//loading static assets

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//implementing middleware

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));


app.use(nocache());
app.use(flash());

//middleware bodyParser

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



router.post("/login", (req, res) => {
    if (req.body.email === credential.email && req.body.password === credential.password) {
        req.session.user = req.body.email;
        return res.redirect("/dashboard");
    } else if (req.body.email !== credential.email) {
        req.flash("error", "Enter a valid Username!");
        return res.redirect("/");
    } else if (req.body.password !== credential.password) {
        req.flash("error", "Incorrect Password!");
        return res.redirect("/");
    } else {
        req.flash("error", "Invalid Username and Password");
        return res.redirect("/");
    }
});


router.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.render("dashboard", { user: req.session.user });
    } else {
        res.redirect("/");
    }
});


router.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.redirect("/");
        }
    });
});

app.use("/", router);


//Home route
router.get("/", (req, res) => {
    if (!req.session.user) {
        res.render("base", { title: "Login Page", message: req.flash() });
    } else {
        res.redirect("/dashboard");
    }
});


//starting the server
// app.listen(port, () => { console.log(Listening to server at http://localhost:${port}) });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
