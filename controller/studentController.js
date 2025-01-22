const { json } = require("express");
const db = require("../database.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.createStudent = async (req, res) => {
  // res.send(Object.keys(req.body)[0])
  const saltRounds = 10;
  const userPassword = req.body.password;
  const password = await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        // Handle error
        console.log("err:", err);
        return;
      }
      bcrypt.hash(userPassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        // var users = [hash];
        console.log("hash =>", hash);
        resolve(hash);
      });

      // Salt generation successful, proceed to hash the password
    });
  });

  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: password,
    };
    const result = await new Promise((resolve, reject) => {
      var query = `INSERT INTO students SET ?`;
      db.query(query, user, function (err, rows) {
        if (err) {
          reject(err);
        }
        // var users = [rows];
        console.log("rows =>", rows);
        resolve(rows);
      });
    });
    console.log("The solution is ", result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const users = await new Promise((resolve, reject) => {
      const query = `SELECT * FROM students WHERE email = ?`;
      db.query(query, [user.email], (err, result1) => {
        if (err) {
          reject(err);
        }
        resolve(result1);
      });
    });
    console.log("users =>", users);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        login: false,
        message: "User not found",
      });
    } else {
      const logedIn = await new Promise((resolve, reject) => {
        bcrypt.compare(user.password, users[0].password, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
      if (logedIn === false) {
        res.status(401).json({
          message: "credentials not matched",
        });
      } else {
        let jwtSecretKey = process.env.JWT_SECRET;
        let data = {
          time: Date(),
          userId: users[0].id,
        };

        const token = jwt.sign(data, jwtSecretKey);
        res.status(200).json({
          message: "Login Successful",
          token: token,
        });
      }
    }
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
};
exports.fetchAllStudents = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM students", (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        // var users = [rows];
        console.log("rows =>", rows);
        resolve(rows);
      });
    });
    console.log("The solution is ", result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
  // finally{

  //     // db.release();
  // }
};
exports.updateStudent = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
    };
    const result = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE students SET ? WHERE id = ?",
        [user, req.params.id],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
    console.log("The solution is ", result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
};
exports.studentById = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM students where id=" + req.params.id,
        (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          // var users = [rows];
          console.log("rows =>", rows);
          resolve(rows);
        }
      );
    });
    console.log("The solution is ", result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM students where id=" + req.params.id + "",
        (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          // var users = [rows];
          console.log("rows =>", rows);
          resolve(rows);
        }
      );
    });
    console.log("The solution is ", result);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error =>", error);
    res.status(200).json({
      error: error.message,
    });
  }
};
exports.authCheck = function (req, res, next) {
  res.send("hello");
};
