const express = require("express");
const { registrarDiagnostico } = require("../controllers/diagnostico.controller");

const router = express.Router();

router.post("/registro", registrarDiagnostico);

module.exports = router;
