const express = require("express");
router = express.Router();
const { get, post } = require("../controllers/results");

router.get("/results", get);
router.post("/results", post);

module.exports = router;
