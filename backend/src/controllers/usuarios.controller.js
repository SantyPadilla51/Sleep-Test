const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario"); // ✅ modelo real (CommonJS)

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// ========================================================
// ✅ REGISTRO DE USUARIO
// ========================================================
const registrarUsuario = async (req, res) => {
  const { nombre, email, contrasena} = req.body;
  console.log("📥 DATOS RECIBIDOS:", req.body);


  try {
    // Validación básica
    if (!nombre || !email || !contrasena) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Verificar email duplicado
    const existente = await Usuario.obtenerPorEmail(email);
    if (existente) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    // Hash contraseña
    const contrasenaHasheada = await bcrypt.hash(contrasena, SALT_ROUNDS);

    // Crear usuario
    const id = await Usuario.crear({
      nombre,
      email,
      contrasena: contrasenaHasheada,
        });

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      userId: id
    });

  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ========================================================
// ✅ LOGIN DE USUARIO
// ========================================================
const loginUsuario = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    if (!email || !contrasena) {
      return res.status(400).json({ message: "Datos incompletos." });
    }

    // Buscar usuario
    const usuario = await Usuario.obtenerPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    // Comparar contraseñas
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email,
        nombre: usuario.nombre
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
};


module.exports = {
  registrarUsuario,
  loginUsuario
};
