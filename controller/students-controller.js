// Controller exports all functions to perform inside of a route handler like res.render, etc.
//In our case we use it to write functions for the api requests namely get,post,put and delete
const Student = require("../models/model");

//findStudents function to find students by query parameter and if none specified we get all students in the database
const findStudents = (req, res) => {
  if (req.query.id) {
    // If query has id we retrieve one specific student else retrieve all students
    const id = req.query.id;
    Student.findById(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send({ message: "Error student was not found" });
      });
  } else {
    Student.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send({ message: "Error student was not found" });
      });
  }
};

//postStudentDetails function gets form input and uploads student details to database
const postStudentDetails = (req, res) => {
  if (!req.body) {
    res.send("Cannot create student record without all details");
  } else {
    const student = new Student(req.body);
    student
      .save()
      .then((data) => {
        res.send("Succefully created student record");
        res.send(data);
      })
      .catch((err) => {
        res.send({ message: "An error occured...Couldn't register student" });
      });
  }
};

//updateStudentDetails function updates the student record based on details provided by the form
const updateStudentDetails = (req, res) => {
  if (!req.body) {
    res.send("Cannot update details without filling all fields");
  } else {
    const id = req.params.id;
    Student.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send("An error occured");
      });
  }
};

//deleteStudent function removes the student with the id mentioned as route parameter
const deleteStudent = (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete(id)
    .then((data) => {
      res.send("Succesfully deleted the student record");
    })
    .catch((err) => {
      res.send("An error occured");
    });
};

module.exports = {
  findStudents,
  postStudentDetails,
  updateStudentDetails,
  deleteStudent,
};
