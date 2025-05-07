const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", require("./routes/auth"));
app.use("/courses", require("./routes/courses"));
app.use("/payments", require("./routes/payments"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});