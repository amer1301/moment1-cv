require('dotenv').config(); // Läser miljövariabler från .env-filen

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,      // Använder miljövariabler från .env
    user: process.env.MYSQL_USER,      // Använder miljövariabler från .env
    password: process.env.MYSQL_PASSWORD, // Använder miljövariabler från .env
    database: process.env.MYSQL_DATABASE, // Använder miljövariabler från .env
    port: process.env.MYSQL_PORT        // Använder miljövariabler från .env
});


connection.connect((err) => {
    if (err) {
        console.error("Connection failed " + err);
        return;
    }

    console.log("connected to MySQL");

// skapa databas
connection.query("CREATE DATABASE IF NOT EXISTS cv", (err, result) => {
    if (err) throw err;
    console.log("Database created or exists already");

    // växla till databas
    connection.changeUser({ database: 'cv' }, (err) => {
        if (err) throw err;
        console.log("Database changed to cv");

// SQL-fråga
const createTableQuery = `
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursecode VARCHAR(50) NOT NULL,
    coursename VARCHAR(255) NOT NULL,
    syllabus VARCHAR(255),
    progression CHAR(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

connection.query(createTableQuery, (err, results) => {
if (err) throw err;
console.log("Table courses created or exists already");
connection.end(); // Stäng anslutningen
});
});
});
});
