
const db = require("../database.js");

exports.createStudent = async (req, res) => {
 
    try {
        const result = await new Promise((resolve,reject)=>{
            db.query("SELECT * FROM students", (err, rows, fields) => {
                if (err) { reject(err) };
                // var users = [rows];
                console.log("rows =>" , rows)
                resolve(rows);
            });
        })
        console.log("The solution is ", result);
        res.status(200).json({data: result})

    } catch (error) {
        console.log("Error =>" , error)
        res.status(200).json({
            error: error.message
        })
    }
}
exports.fetchAllStudents = async (req, res) => {
    try {
        const result = await new Promise((resolve,reject)=>{
            db.query("SELECT * FROM students", (err, rows, fields) => {
                if (err) { reject(err) };
                // var users = [rows];
                console.log("rows =>" , rows)
                resolve(rows);
            });
        })
        console.log("The solution is ", result);
        res.status(200).json({data: result})

    } catch (error) {
        console.log("Error =>" , error)
        res.status(200).json({
            error: error.message
        })
    }
    // finally{
        
    //     // db.release();
    // }
}
exports.updateStudent = async (req, res) => {
    try {
        const result = await new Promise((resolve,reject)=>{
            db.query("UPDATE students SET ? where id="+req.params.id+"", (err, rows, fields) => {
                if (err) { reject(err) };
                // var users = [rows];
                console.log("rows =>" , rows)
                resolve(rows);
            });
        })
        console.log("The solution is ", result);
        res.status(200).json({data: result})

    } catch (error) {
        console.log("Error =>" , error)
        res.status(200).json({
            error: error.message
        })
    }
}
exports.studentById = async (req, res) => {
    try {
        const result = await new Promise((resolve,reject)=>{
            db.query("SELECT * FROM students where id="+req.params.id, (err, rows, fields) => {
                if (err) { reject(err) };
                // var users = [rows];
                console.log("rows =>" , rows)
                resolve(rows);
            });
        })
        console.log("The solution is ", result);
        res.status(200).json({data: result})

    } catch (error) {
        console.log("Error =>" , error)
        res.status(200).json({
            error: error.message
        })
    }
}
exports.deleteStudent = async (req, res) => {
    try {
        const result = await new Promise((resolve,reject)=>{
            db.query("DELETE FROM students where id="+req.params.id+"", (err, rows, fields) => {
                if (err) { reject(err) };
                // var users = [rows];
                console.log("rows =>" , rows)
                resolve(rows);
            });
        })
        console.log("The solution is ", result);
        res.status(200).json({data: result})

    } catch (error) {
        console.log("Error =>" , error)
        res.status(200).json({
            error: error.message
        })
    }
}
// const deleteStudent = (req, res) => {

// }

// modules.exports = { createStudent, fetchAllStudents, updateStudent, studentById, deleteStudent }
// export default () =>{
//     return { createStudent, fetchAllStudents, updateStudent, studentById, deleteStudent }
// };
