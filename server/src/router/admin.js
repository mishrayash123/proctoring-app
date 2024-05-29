const express = require("express");
const { authenticateJWT } = require("../middleware/Token");
const {
  addTeacher,
  getTeachers,
  getTeacher,
  getStudents,
  getStudent,
  getQuizes,
  getCourses,
  getResults,
} = require("../controllers/adminController");
const { getCourseQuizes } = require("../controllers/teacherController");
const router = express.Router();

// create
router.route("/addTeacher").post( addTeacher);

//get
router.route("/getTeachers").get( getTeachers);
router.route("/getStudents").get( getStudents);
router.route("/getQuizes").get( getQuizes);
router.route("/getCourses").get( getCourses);
router.route("/getResults/:id").get( getResults); // student id //quiz id
router.route("/getCourseQuizes/:id").get( getCourseQuizes) // course id


module.exports = router;
