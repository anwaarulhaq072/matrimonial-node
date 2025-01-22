// import express from "express"
const express = require("express");
// import {fetchAllStudents, createStudent, updateStudent, studentById, deleteStudent} from "../controller/studentController.js";
const studentController = require("../controller/studentController.js");
const router = express.Router();
var Authentication = require('../middleware/jwt-auth');

router.get('/', studentController.fetchAllStudents);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.get('/:id', studentController.studentById);
router.delete('/:id', studentController.deleteStudent);
router.post('/login', studentController.loginUser);
router.get('/authcheck/authcheck', Authentication.checkAuth , studentController.authCheck);



module.exports = router