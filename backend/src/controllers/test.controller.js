const TestSueño = require("../models/testSueño.js");
const TestTrabajo = require("../models/testTrabajo.js");
const TestSocial = require("../models/testSocial.js");

// ======================
//   REGISTRAR SUEÑO
// ======================
const registrarSueño = async (req, res) => {
  try {
    const { dia, horas } = req.body;

    if (!dia || !horas) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const id = await TestSueño.crear({ dia, horas });

    res.json({
      msg: "Registro de sueño guardado correctamente",
      id,
    });
  } catch (error) {
    console.error("Error al registrar sueño:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// ======================
//   REGISTRAR TRABAJO
// ======================
const resgistrarTrabajo = async (req, res) => {
  try {
    const { dia, horas } = req.body;

    if (!dia || !horas) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const id = await TestTrabajo.crear({ dia, horas });

    res.json({
      msg: "Registro de trabajo guardado correctamente",
      id,
    });
  } catch (error) {
    console.error("Error al registrar trabajo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// ======================
//   REGISTRAR SOCIAL
// ======================
const registrarSocial = async (req, res) => {
  try {
    const { dia, horas } = req.body;

    if (!dia || !horas) {
      return res.status(400).json({ msg: "Faltan datos" });
    }

    const id = await TestSocial.crear({ dia, horas });

    res.json({
      msg: "Registro social guardado correctamente",
      id,
    });
  } catch (error) {
    console.error("Error al registrar social:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  registrarSueño,
  resgistrarTrabajo,
  registrarSocial,
};
