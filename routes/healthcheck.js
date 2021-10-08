const express = require("express");
router = express.Router();
const { healthcheck } = require("./../controllers/healthcheck");

router.get("/", healthcheck);

module.exports = router;
