const Rating = require("../models/rating");

exports.getRating = (req, res, next) => {
  const movieId = req.params.id;

  Rating.find({ movieId: movieId })
    .then((ratings) => {
      console.log("movie rating");

      console.log(ratings);
      let totalCount = 0;
      let ratingValue = 0;

      ratings.forEach((rating) => {
        totalCount += rating.value;
      });
      if (totalCount) ratingValue = totalCount / ratings.length;
      // ratingValue = Math.round(ratingValue * 10) / 10;

      res.status(200).json({
        message: "fetched ratings successfully!",
        count: ratings.length,
        value: ratingValue,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserRating = (req, res, next) => {
  const movieId = req.params.id;
  console.log("for rating user is:");
  console.log(req.user);

  Rating.findOne({ user: req.user.userId, movieId: movieId })
    .then((rating) => {
      console.log("so the current user rating is");

      console.log(rating);
      if (!rating) {
        res.status(200).json({
          message: "fetched user's ratings successfully!",
          currentRating: 0,
        });
      } else {
        res.status(200).json({
          message: "fetched user's ratings successfully!",
          currentRating: rating.value,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.postRating = (req, res, next) => {
  //   console.log(req.body);
  //   console.log("id is:");
  //   console.log(req.body.user);
  const newrating = new Rating(req.body);

  Rating.findOne({ user: req.user.userId, movieId: req.body.movieId })
    .then((rating) => {
      console.log("in post, so the rating is");

      console.log(rating);
      //   if (!rating) {
      //     // res.status(200).json({
      //     //   message: "fetched user's ratings successfully!",
      //     //   currentRating: 0,
      //     // });
      //     rating=newrating
      //   } else {
      //     rating.value=newrating.value
      //   }
      if (!rating) rating = newrating;
      else {
        rating.value = newrating.value;
      }
      //   rating.movieId = newrating.movieId;
      //   rating.value = newrating.value;
      //   rating.user = newrating.user;

      rating.save().then((result) => {
        res.status(200).json({
          message: "rated movie!",
          rating: rating,
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  //   Rating.updateOne({ user: req.user.userId, movieId: req.body.movieId })
  //     .then((rating) => {
  //       console.log("so the rating is");
  //       console.log(rating);
  //       res.status(200).json({
  //         message: "rated movie!",
  //         rating: rating,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // rating
  //   .save()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "rated movie!",
  //       rating: rating,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   } else {
  //     res.status(200).json({
  //       message: "fetched user's ratings successfully!",
  //       currentRating: rating.value,
  //     });
  //   }
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // rating
  //   .save()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "rated movie!",
  //       rating: rating,
  //     });
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};
