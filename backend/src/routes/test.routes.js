const express = require("express");
const {
  registrarSueño,
  registrarSocial,
  resgistrarTrabajo,
} = require("../controllers/test.controller");
const router = express.Router();

router.post("/sueño", registrarSueño);
router.post("/trabajo", resgistrarTrabajo);
router.post("/social", registrarSocial);

module.exports = router;
