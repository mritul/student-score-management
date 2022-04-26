const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const studentsRouter = require("./routes/students-routes");
const mongoose = require("mongoose");

//Configuring the .env file
dotenv.config({ path: "config.env" });

//Connecting to mongoDB database
mongoose
  .connect(process.env.dbURI)
  .then(() => {
    //Running the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Creating the app
const app = express();

//Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend/views")); //Manually setting root directory for views

//Middleware annd static files
app.use(morgan("dev"));
app.use(express.static("./frontend/public"));
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", studentsRouter);

//Without Router
// app.get("/", (req, res) => {
//   res.render("index", { title: "Home", link: "/css/index.css" });
// });

// app.get("/add-student", (req, res) => [
//   res.render("add-student", {
//     title: "Add Student",
//     link: "/css/add-student.css",
//   }),
// ]);

// app.get("/update-student", (req, res) => [
//   res.render("update-student", {
//     title: "Update Student Details",
//     link: "/css/update-student.css",
//   }),
// ]);
