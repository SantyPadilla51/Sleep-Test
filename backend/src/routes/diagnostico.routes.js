const express = require("express");
const { registrarDiagnostico,obtenerDiagnostico,borrarDiagnostico } = require("../controllers/diagnostico.controller");

const router = express.Router();

router.post("/registro", registrarDiagnostico);
router.get("/obtener", obtenerDiagnostico);
router.delete("/borrar/:id", borrarDiagnostico);

module.exports = router;
