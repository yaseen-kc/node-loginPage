const express = require('express')
const app = express()

const port = process.env.PORT || 3000


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
})

app.listen(port, () => { console.log("http://localhost:3000"); })