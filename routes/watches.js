const express = require("express");
const router = express.Router();

const watchController = require("../controllers/watches");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, watchController.getWatches);
router.post("/", isAuth, watchController.postWatches);
router.delete("/:id", watchController.deleteWatches);

module.exports = router;
