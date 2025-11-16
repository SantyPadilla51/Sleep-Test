const pool = require("./mysql");

const AdminPreguntas = {

  async crear(texto_pregunta, tipo, opciones) {
    try {
      const [result] = await pool.query(
        `INSERT INTO preguntas (texto_pregunta, tipo, opciones) VALUES (?, ?, ?)`,
        [
          texto_pregunta,
          tipo,
          opciones ? JSON.stringify(opciones) : null
        ]
      );
      return result.insertId;
    } catch (err) {
      console.error("❌ Error al insertar pregunta:", err);
      throw err;
    }
  },

  async obtenerTodas() {
    const [rows] = await pool.query(`SELECT * FROM preguntas`);
    return rows;
  },

  async obtenerPorId(id_pregunta) {
    const [rows] = await pool.query(
      `SELECT * FROM preguntas WHERE id_pregunta = ?`,
      [id_pregunta]
    );
    return rows[0];
  },

  async actualizar(id_pregunta, texto_pregunta, tipo, opciones) {
    await pool.query(
      `UPDATE preguntas
         SET texto_pregunta = ?, tipo = ?, opciones = ?
         WHERE id_pregunta = ?`,
      [
        texto_pregunta,
        tipo,
        opciones ? JSON.stringify(opciones) : null,
        id_pregunta
      ]
    );
  },

  async eliminar(id_pregunta) {
    await pool.query(
      `DELETE FROM preguntas WHERE id_pregunta = ?`,
      [id_pregunta]
    );
  },

  async buscarPorTexto(texto) {
  const [rows] = await pool.query(
    "SELECT * FROM preguntas WHERE texto_pregunta = ? LIMIT 1",
    [texto]
  );
  return rows[0] || null;
}

};

module.exports = AdminPreguntas;
