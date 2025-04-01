const { Client } = require("pg");
const express = require("express");
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded( {extended: true })); //aktivera formulärdata

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

// Starta servern
app.listen(port, () => {
    console.log("Server startade på port" + port);
})