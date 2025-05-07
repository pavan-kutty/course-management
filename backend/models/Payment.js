const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  date: { type: Date, default: Date.now },
  amount: Number,
});

module.exports = mongoose.model("Payment", paymentSchema);