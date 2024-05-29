const express = require("express");
const { getCourseQuizes } = require("../controllers/teacherController");
const {
  getCourses,
  getQuiz,
  getResult,
  getAllresults,
  attemptQuiz,
  cheatingDetection,
} = require("../controllers/studentController");
const { authenticateJWT } = require("../middleware/Token");
const router = express.Router();

router.route("/getCourses/:id").get( getCourses); // student id
router.route("/getCourseQuizes/:id").get( getCourseQuizes); //course id
router.route("/getQuiz/:id").get( getQuiz); //quiz id
router.route("/attemptQuiz/:id").post( attemptQuiz); // quiz id //student id req.body
router.route("/getResult/:id").post( getResult); //quiz id
router.route("/getAllresults/:id").get( getAllresults); //student id
router.route("/antiCheat/:id").post( cheatingDetection); //quiz id //student id req.body

module.exports = router;
