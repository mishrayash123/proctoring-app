const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/Token");
const {
  addCourse,
  addStudent,
  addQuiz,
  enrollStudents,
  getStudents,
  getCourseQuizes,
  addQuizCsv,
  getMyCourses,
  getResults,
} = require("../controllers/teacherController");

//add
router.route("/addCourse/:id").post( addCourse); //teacher id
router.route("/addStudent/:id").post( addStudent); //teacher id
router.route("/addQuiz/:id").post( addQuiz); //course id
router.route("/addQuizCsv/:id").post( addQuizCsv); //course id
router.route("/enrollStudents/:id").post( enrollStudents); //course id

//get
router.route("/getMyCourses/:id").get( getMyCourses); //teacher id
router.route("/getStudents").get( getStudents);
router.route("/getCourseQuizes/:id").get( getCourseQuizes); //course id
router.route('/getResults/:id').get( getResults); //student id

module.exports = router;
