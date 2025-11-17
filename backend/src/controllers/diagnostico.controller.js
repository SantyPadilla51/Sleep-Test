const Diagnostico = require("../models/diagnostico"); // ✅ modelo real (CommonJS)


// ========================================================
// ✅ carga de Diagnostico
// ========================================================
const registrarDiagnostico = async (req, res) => {
  const { tipoDeTabla, descripcion1, descripcion2} = req.body;
  console.log("📥 DATOS RECIBIDOS:");
  try {
    // Validación básica
    if (!tipoDeTabla || !descripcion1 || !descripcion2) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Crear Diagnostico
    const id = await Diagnostico.crear({
      tipoDeTabla,
      descripcion1,
      descripcion2,
        });

    return res.status(201).json({
      message: "Diagnostico registrado con éxito"
    });

  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ message: error.message });
  }
};
const obtenerDiagnostico = async (req, res) => {
  try {
    const lista = await Diagnostico.obtener(); // usa tu método obtener()

    return res.status(200).json(lista);

  } catch (error) {
    console.error("Error al obtener diagnósticos:", error);
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registrarDiagnostico,
  obtenerDiagnostico
};
