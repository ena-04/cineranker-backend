const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const User = require("../models/users");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            throw new Error("Email already exists");
            console.log("email prints" + user);
            // throw new Error("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 4 characters."
    )
      .isLength({ min: 4 })
      .isAlphanumeric(),
    body("confirm-password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return User.findOne({ name: value }).then((user) => {
          if (user) {
            console.log("Username already existsssssssssss");
            throw new Error("Username already exists");
            console.log("user prints" + user);
          }
        });
      }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
