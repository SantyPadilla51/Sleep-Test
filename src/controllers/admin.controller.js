const AdminPreguntas = require("../models/adminPreguntas");
const AdminRespuestas = require("../models/adminRespuestas");
const AdminUsuarios = require("../models/adminUsuarios");

async function crearPregunta() {
  const texto = document.getElementById("texto").value.trim();
  const tipo = document.getElementById("tipo").value;

  let opciones = null;
  if (tipo === "opcion") {
    const raw = document.getElementById("opciones").value.trim();
    opciones = raw.split(",").map(o => o.trim()).filter(o => o);
  }

  if (!texto) {
    mostrarErrorInput("texto", "Por favor, ingresa la pregunta");
    return;
  }

  try {
    const res = await fetch("/admin/preguntas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ texto_pregunta: texto, tipo, opciones })
    });

    const result = await res.json().catch(() => ({ message: "Error desconocido" }));

    if (!res.ok) {
      mostrarErrorInput("texto", result.message || "Error creando pregunta");
      return;
    }

    document.getElementById("texto").value = "";
    if (tipo === "opcion") document.getElementById("opciones").value = "";

    mostrarMensaje("Pregunta creada correctamente", "success");
    cargarPreguntas();

  } catch (err) {
    mostrarMensaje("Error de conexión con el servidor", "error");
    console.error(err);
  }
};

const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await AdminPreguntas.obtenerTodas();
    res.json(preguntas);
  } catch (err) {
    console.error("Error al obtener preguntas:", err);
    res.status(500).json({ message: "Error al obtener preguntas" });
  }
};

const actualizarPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto_pregunta, tipo, opciones } = req.body;

    if (!texto_pregunta || !tipo) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existePregunta = await AdminPreguntas.buscarPorTexto(texto_pregunta);

    if (existePregunta && existePregunta.id !== Number(id)) {
      return res.status(400).json({
        message: "Ya existe otra pregunta con ese texto"
      });
    }

    await AdminPreguntas.actualizar(id, texto_pregunta, tipo, opciones);

    res.json({ message: "Pregunta actualizada" });
  } catch (err) {
    console.error("Error al actualizar pregunta:", err);
    res.status(500).json({ message: "Error al actualizar la pregunta" });
  }
};


const eliminarPregunta = async (req, res) => {
  try {
    await AdminPreguntas.eliminar(req.params.id);
    res.json({ message: "Pregunta eliminada" });
  } catch (err) {
    console.error("Error al eliminar pregunta:", err);
    res.status(500).json({ message: "Error al eliminar la pregunta" });
  }
};

const obtenerRespuestas = async (req, res) => {
  try {
    const respuestas = await AdminRespuestas.obtenerTodas();
    res.json(respuestas);
  } catch (err) {
    console.error("Error al obtener respuestas:", err);
    res.status(500).json({ message: "Error al obtener respuestas" });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await AdminUsuarios.obtenerTodos();
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    await AdminUsuarios.eliminar(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

module.exports = {
  crearPregunta,
  obtenerPreguntas,
  actualizarPregunta,
  eliminarPregunta,
  obtenerRespuestas,
  obtenerUsuarios,
  eliminarUsuario
};
