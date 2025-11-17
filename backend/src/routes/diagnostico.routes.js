const express = require("express");
const { registrarDiagnostico,obtenerDiagnostico } = require("../controllers/diagnostico.controller");

const router = express.Router();

router.post("/registro", registrarDiagnostico);
router.get("/obtener", obtenerDiagnostico);

module.exports = router;
