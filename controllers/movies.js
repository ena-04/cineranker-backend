const Review = require("../models/review");
const Like = require("../models/like");
const Watch = require("../models/watch");

exports.postReview = (req, res, next) => {
  const review = new Review(req.body);

  review
    .save()
    .then((result) => {
      res.status(200).json({
        message: "added review!",
        review: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getReview = (req, res, next) => {
  const movieId = req.params.id;
  Review.find({ movieId: movieId })
    .populate("user")
    .then((reviews) => {
      res.status(200).json({
        message: "fetched favourites successfully!",
        reviews: reviews,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTotalLikes = (req, res, next) => {
  const movieId = req.params.id;
  Like.find({ movieId: movieId })
    .then((likes) => {
      res.status(200).json({
        message: "fetched favourites successfully!",
        likes: likes.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTotalWatches = (req, res, next) => {
  const movieId = req.params.id;
  Watch.find({ movieId: movieId })
    .then((watches) => {
      res.status(200).json({
        message: "fetched favourites successfully!",
        watches: watches.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
