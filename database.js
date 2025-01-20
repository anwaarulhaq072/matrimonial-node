// const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "matrimonial",
// });

// connection.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database connected");
//     }
// });

// import dotenv from "dotenv";
// import mysql from "mysql";
const mysql= require("mysql")
const dotenv = require ("dotenv")
dotenv.config();
// const mysql = require('mysql');

// // Create a connection pool using environment variables
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   connectionLimit: 10
// });

// module.exports = pool;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// connection.connect();

// connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
//   if (err) throw err;

//   console.log("The solution is: ", rows[0].solution);
// });

// connection.end();
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySql DB');
});


module.exports = connection