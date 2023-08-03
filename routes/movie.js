const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies");
const isAuth = require("../middleware/isAuth");

// router.post("/reviews", isAuth, movieController.postReview);
router.get("/reviews/:id", movieController.getReview);
router.get("/likes/:id", movieController.getTotalLikes);
router.get("/watches/:id", movieController.getTotalWatches);

module.exports = router;
