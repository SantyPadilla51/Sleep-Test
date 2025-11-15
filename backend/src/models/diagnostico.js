const pool = require("./mysql");

const Diagnostico = {
  async crear({ nombre, email, contrasena}) {
    const [result] = await pool.query(
      `INSERT INTO usuarios (nombre, email, contrasena)
       VALUES (?, ?, ?)`,
      [nombre, email, contrasena]
    );

    return result.insertId;
  },

};

module.exports = Diagnostico;
