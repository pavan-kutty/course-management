const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const courses = await Course.find();
  const user = await User.findById(req.user.id);
  res.json({ courses, enrolledCourses: user.enrolledCourses });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.send(course);
});

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Unauthorized");
  const course = new Course(req.body);
  await course.save();
  res.send("Course added");
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Unauthorized");
  await Course.findByIdAndDelete(req.params.id);
  res.send("Course deleted");
});

module.exports = router;
