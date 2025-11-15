const express = require("express");
const { diagnostico } = require("../controllers/diagnostico.controller");

const router = express.Router();

router.post("/diagnostico", diagnostico);

module.exports = router;
