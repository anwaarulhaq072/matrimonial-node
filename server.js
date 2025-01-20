// import express from "express"
// import mysql from "mysql"
// import cors from "cors"
// import { createConnection } from "mysql"
// import connection from "./database.js";
// import studentRouter from "./router/studentRouter.js"
const express = require("express");
const studentRouter = require("./router/studentRouter.js")

const app = express();
app.use(express.json());
app.use('/api/v1/students', studentRouter);
app.get("/", (req, res) =>{
    // connection.query("SELECT * FROM students", (err, result) => {
     
    // })
    res.send("hello");
    console.log("hello");
})

app.listen(9000, () => {
    console.log("Server running on port 9000");
});