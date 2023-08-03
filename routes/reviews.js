const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviews");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, reviewController.getReview);
router.post("/", isAuth, reviewController.postReview);
// router.delete("/:id", likeController.deleteLikes);

module.exports = router;
