const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Payment = require("../models/Payment");
const Course = require("../models/Course");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  const user = await User.findById(req.user.id);

  if (user.enrolledCourses.includes(courseId)) return res.status(400).send("Already enrolled");

  const payment = new Payment({
    userId: req.user.id,
    courseId,
    amount: course.fee,
  });

  user.enrolledCourses.push(courseId);
  await payment.save();
  await user.save();
  res.send("Payment successful");
});

router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Unauthorized");
  const payments = await Payment.find().populate("userId courseId");
  res.json(payments);
});

module.exports = router;
