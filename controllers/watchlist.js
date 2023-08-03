const Favourite = require("../models/favourite");

exports.getList = (req, res, next) => {
  console.log("user is:");
  console.log(req.user);
  Favourite.find({ user: req.user.userId })
    .then((movies) => {
      res.status(200).json({
        message: "fetched favourites successfully!",
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

exports.postList = (req, res, next) => {
  //   console.log(req.body);
  //   console.log("id is:");
  //   console.log(req.body.user);
  const movie = new Favourite({
    id: req.body.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    runtime: req.body.runtime,
    user: req.body.user,
  });
  movie
    .save()
    .then((result) => {
      res.status(201).json({
        message: "added movie!",
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

exports.deleteList = (req, res, next) => {
  const movieId = req.params.id;
  console.log(movieId);
  Favourite.deleteOne({ id: movieId })
    .then((result) => {
      res.status(201).json({
        message: "deleted movie!",
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
