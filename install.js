require('dotenv').config(); // Läser miljövariabler från .env-filen
const { Client } = require("pg"); // Importera PostgreSQL-biblioteket

const connection = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }

    console.log("Connected to PostgreSQL");

    // Skapa databas om den inte redan finns (PostgreSQL har inget kommando för att skapa databas i själva anslutningen, så vi skapar den via en separat process i detta fall)
    connection.query("CREATE DATABASE IF NOT EXISTS cv", (err, result) => {
        if (err) throw err;
        console.log("Database created or exists already");

        // Växla till den nyss skapade databasen
        connection.query('USE cv', (err) => {
            if (err) throw err;
            console.log("Database changed to cv");

            // Skapa tabellen för kurser
            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
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
