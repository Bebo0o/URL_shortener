const express = require("express");
const router = express.Router();
const controller = require("../controllers/linkController");
const validateUrl = require("../middleware/validateUrl");

router.post("/shorten", validateUrl, controller.shortenUrl);
router.get("/stats", controller.getStats);
router.get("/:code", controller.redirectUrl);

module.exports = router;