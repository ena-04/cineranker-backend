require("dotenv").config();

const User = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error("creating user failed");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const name = req.body.username;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const user = new User({
        email: email,
        password: hashedPwd,
        name: name,
        favourites: [],
      });
      return user.save().then((user) => {
        res.status(201).json({ message: "user created!", userId: user._id });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect password");
        error.statusCode = 401;
        throw error;
      }
      console.log("hi");
      const accessToken = jwt.sign(
        {
          username: loadedUser.name,
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.ACCESS_TOKEN_KEY
        // { expiresIn: "30s" }
      );

      // const refreshToken = jwt.sign(
      //   {
      //     username: loadedUser.name,
      //     email: loadedUser.email,
      //     userId: loadedUser._id.toString(),
      //   },
      //   process.env.REFRESH_TOKEN_KEY,
      //   { expiresIn: "1d" }
      // );
      // res.cookie("jwt", refreshToken, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });
      res.status(200).json({ accessToken: accessToken, user: loadedUser });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
