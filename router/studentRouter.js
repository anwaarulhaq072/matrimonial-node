// import express from "express"
const express = require("express");
// import {fetchAllStudents, createStudent, updateStudent, studentById, deleteStudent} from "../controller/studentController.js";
const studentController = require("../controller/studentController.js");
const router = express.Router();

router.get('/', studentController.fetchAllStudents);
router.post('/', studentController.createStudent);
router.put('/update', studentController.updateStudent);
router.get('/:id', studentController.studentById);
router.delete('/:id', studentController.deleteStudent);



module.exports = router