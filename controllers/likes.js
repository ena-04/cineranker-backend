const Like = require("../models/like");

exports.getLikes = (req, res, next) => {
  console.log("user is:");
  console.log(req.user);
  Like.find({ user: req.user.userId })
    .then((movies) => {
      console.log(movies);
      res.status(200).json({
        message: "fetched liked movies successfully!",
        movies: movies,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLikes = (req, res, next) => {
  //   console.log(req.body);
  //   console.log("id is:");
  //   console.log(req.body.user);
  const movie = new Like({
    movieId: req.body.movieId,
    user: req.body.user,
    poster: req.body.poster,
  });
  movie
    .save()
    .then((result) => {
      res.status(201).json({
        message: "liked movie!",
        movie: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteLikes = (req, res, next) => {
  const movieId = req.params.id;
  console.log(movieId);
  Like.deleteOne({ movieId: movieId })
    .then((result) => {
      res.status(201).json({
        message: "unliked movie!",
        movie: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
