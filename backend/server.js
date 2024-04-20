require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// dev route logs
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MDB_URI)
  .then(() => {
    console.log("connected to the database");
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// redirect home
app.get("/", (req, res) => {
  res.redirect("/api/workouts");
});
