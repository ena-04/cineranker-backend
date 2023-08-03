const Review = require("../models/review");

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
  console.log("user is:");
  console.log(req.user);
  Review.find({ user: req.user.userId })
    // .populate("user")
    .then((reviews) => {
      res.status(200).json({
        message: "fetched your reviews successfully!",
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
