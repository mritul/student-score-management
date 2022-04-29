const express = require("express");
const req = require("express/lib/request");
const route = express.Router();
const controller = require("../controller/students-controller");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config.env") });

route.get("/", (req, res) => {
  //We use axios to make a get request to the api we made ans use that that data in rendering ejs
  axios
    .get(`http://localhost:${process.env.PORT}/api/students`)
    .then((response) => {
      const data = response.data;
      res.render("index", {
        title: "Home",
        students: data,
        link: "/css/index.css",
        port: process.env.port,
      });
    })
    .catch((err) => {
      res.send({ message: "An error occured" });
      console.log(err);
    });
  // res.render("index", { title: "Home", link: "/css/index.css" });
});

route.get("/add-student", (req, res) => {
  res.render("add-student", {
    title: "Add Student",
    link: "/css/add-student.css",
  });
});

route.get("/update-student", (req, res) => {
  axios
    .get(`http://localhost:${process.env.PORT}/api/students`, {
      params: { id: req.query.id },
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      res.render("update-student", {
        title: "Update Student Details",
        link: "/css/update-student.css",
        student: data,
        port: process.env.PORT,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

//API Route handling

//Finding students (all(default) or by id)
route.get("/api/students", controller.findStudents);

//Creating a new student record
route.post("/api/students", controller.postStudentDetails);

//Updating student record
route.put("/api/students/:id", controller.updateStudentDetails);

//Deleting student record
route.delete("/api/students/:id", controller.deleteStudent);

module.exports = route;
