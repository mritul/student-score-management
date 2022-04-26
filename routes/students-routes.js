const express = require("express");
const req = require("express/lib/request");
const route = express.Router();
const controller = require("../controller/students-controller");

route.get("/", (req, res) => {
  res.render("index", { title: "Home", link: "/css/index.css" });
});

route.get("/add-student", (req, res) => {
  res.render("add-student", {
    title: "Add Student",
    link: "/css/add-student.css",
  });
});

route.get("/update-student", (req, res) => {
  res.render("update-student", {
    title: "Update Student Details",
    link: "/css/update-student.css",
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
