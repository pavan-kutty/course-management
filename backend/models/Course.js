const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  fee: Number,
  duration: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Course", courseSchema);