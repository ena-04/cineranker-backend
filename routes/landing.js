const express = require("express");
const router = express.Router();

const mainController = require("../controllers/watchlist");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, mainController.getList);
router.post("/", isAuth, mainController.postList);
// router.post("/isFavourite", mainController.isFavourite);
router.delete("/:id", mainController.deleteList);

module.exports = router;
