const Watch = require("../models/watch");

exports.getWatches = (req, res, next) => {
  console.log("user is:");
  console.log(req.user);
  Watch.find({ user: req.user.userId })
    .then((movies) => {
      res.status(200).json({
        message: "fetched watched movies successfully!",
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

exports.postWatches = (req, res, next) => {
  //   console.log(req.body);
  //   console.log("id is:");
  //   console.log(req.body.user);
  const movie = new Watch({
    movieId: req.body.movieId,
    user: req.body.user,
    poster: req.body.poster,
  });
  movie
    .save()
    .then((result) => {
      res.status(201).json({
        message: "watched movie!",
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

exports.deleteWatches = (req, res, next) => {
  const movieId = req.params.id;
  console.log(movieId);
  Watch.deleteOne({ movieId: movieId })
    .then((result) => {
      res.status(201).json({
        message: "unwatched movie!",
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
