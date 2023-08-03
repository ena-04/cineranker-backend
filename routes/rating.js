const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating");
const isAuth = require("../middleware/isAuth");

router.get("/:id", ratingController.getRating);
router.get("/user/:id", isAuth, ratingController.getUserRating);

router.post("/", isAuth, ratingController.postRating);
// router.delete("/:id", likeController.deleteLikes);

module.exports = router;
