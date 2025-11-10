const pool = require("./mysql");

const Usuario = {
  async crear({ nombre, email, contrasena, genero, edad }) {
    const [result] = await pool.query(
      `INSERT INTO usuarios (nombre, email, contrasena, genero, edad)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, email, contrasena, genero, edad]
    );

    return result.insertId;
  },

  async obtenerPorEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ? LIMIT 1",
      [email]
    );
    return rows[0];
  }
};

module.exports = Usuario;
