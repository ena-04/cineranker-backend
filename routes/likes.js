const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likes");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, likeController.getLikes);
router.post("/", isAuth, likeController.postLikes);
router.delete("/:id", likeController.deleteLikes);

module.exports = router;
