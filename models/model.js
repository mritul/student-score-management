const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    rollno: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: String,
      required: true,
    },
    performance: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
