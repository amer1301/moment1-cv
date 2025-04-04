require('dotenv').config();

const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Logga miljövariabler för att kontrollera att de är korrekt definierade
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

// Anslutning till databasen
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL as ID " + connection.threadId);
});

// Startsida - Visa kurser
app.get("/", (req, res) => {
    const query = "SELECT * FROM courses";
    connection.query(query, (err, courses) => {
        if (err) {
            console.error("Error fetching courses: " + err.stack);
            return res.send("Error fetching courses");
        }
        res.render("index", { courses: courses });
    });
});

// Lägg till kurs - Visa formulär
app.get('/add', (req, res) => {
    res.render('add', { error: null });
});

// Lägg till kurs - Hantera formulärdata
app.post("/add", (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;

    if (!coursecode || !coursename || !syllabus || !progression) {
        return res.render("add", { error: "Alla fält måste fyllas i!" });
    }

    const insertQuery = `
        INSERT INTO courses (coursecode, coursename, syllabus, progression)
        VALUES (?, ?, ?, ?)
    `;
    connection.query(insertQuery, [coursecode, coursename, syllabus, progression], (err) => {
        if (err) {
            console.error("Error inserting course: " + err.stack);
            return res.send("Error inserting course");
        }
        res.redirect("/");
    });
});

// Radera kurs
app.get("/delete/:id", (req, res) => {
    const courseId = req.params.id;
    const deleteQuery = "DELETE FROM courses WHERE id = ?";

    connection.query(deleteQuery, [courseId], (err) => {
        if (err) {
            console.error("Error deleting course: " + err.stack);
            return res.send("Error deleting course");
        }
        res.redirect("/");
    });
});

// Om sidan
app.get("/about", (req, res) => {
    res.render("about");
});

// Starta servern
app.listen(port, () => {
    console.log("Server startade på port " + port);
});
