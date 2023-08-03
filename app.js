const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const { check, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();

const mainRoutes = require("./routes/landing");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const likeRoutes = require("./routes/likes");
const watchRoutes = require("./routes/watches");
const ratingRoutes = require("./routes/rating");
const reviewRoutes = require("./routes/reviews");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/watchlist", mainRoutes);
app.use(authRoutes);
app.use("/movie/ratings", ratingRoutes);

app.use("/movie", movieRoutes);
app.use("/likes", likeRoutes);
app.use("/watches", watchRoutes);
app.use("/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

// let PORT
mongoose.connect(`${process.env.MONGO_STRING}`).then((result) => {
  // process.env.STATUS ===
  app.listen(process.env.PORT || 8080);
});
