const cors = require("cors");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const router = express.Router();
const db = require("./api/queries");
var bodyParser = require("body-parser");

app.use("/api", router);
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
router.use(cors());
router.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/add/student", async (req, res) => {
  const { id, firstName, lastName, sex, studyYear } = req.body;
  try {
    await db.insertNewStudent(id, firstName, lastName, sex, studyYear);
    res.redirect("/students");
  } catch (err) {
    res.redirect("/students");
  }
});

app.post("/add/teacher", async (req, res) => {
  const { id, firstName, lastName, sex, age, major } = req.body;
  try {
    await db.insertNewTeacher(id, firstName, lastName, sex, major, age);
    res.redirect("/teachers");
  } catch (err) {
    res.redirect("/teachers");
  }
});

app.get("", (req, res) => res.render("index.html"));
app.get("/add/studentPage", (req, res) =>
  res.render("student/addStudent.html")
);

app.get("/add/teacherPage", (req, res) =>
  res.render("teacher/addTeacher.html")
);

app.get("/students", async (req, res) => {
  const result = await db.queryStudents();
  if (result) {
    res.render("student/index.ejs", {
      page_title: "Student Table",
      data: result,
    });
  }
});
app.get("/delete/teacher", async (req, res) => {
  const id = req.query.id;

  try {
    await db.deleteTeacher(id);
    res.redirect("/teachers");
  } catch (err) {
    res.redirect("/teachers");
  }
});
app.get("/delete/student", async (req, res) => {
  const id = req.query.id;

  try {
    await db.deleteStudent(id);
    res.redirect("/students");
  } catch (err) {
    res.redirect("/students");
  }
});
app.get("/teachers", async (req, res) => {
  const result = await db.queryTeachers();
  if (result) {
    res.render("teacher/index.ejs", {
      page_title: "Teacher Table",
      data: result,
    });
  }
});
app.listen(3080, () => {
  console.log("server running 3080");
});
