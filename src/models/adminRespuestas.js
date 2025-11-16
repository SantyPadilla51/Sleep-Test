const pool = require("./mysql");

const AdminRespuestas = {
  async obtenerTodas() {
    const [rows] = await pool.query(`
      SELECT 
        r.id_respuesta,
        u.nombre AS usuario,
        u.email,
        p.texto_pregunta,
        r.valor
      FROM respuestas r
      INNER JOIN usuarios u ON u.id_usuario = r.id_usuario
      INNER JOIN preguntas p ON p.id_pregunta = r.id_pregunta
      ORDER BY r.id_respuesta DESC
    `);

    return rows;
  },
    crear: async ({ id_usuario = null, session_id = null, id_pregunta, valor }) => {
    const query = `
      INSERT INTO respuestas (id_usuario, session_id, id_pregunta, valor)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [id_usuario, session_id, id_pregunta, valor]);
    return result.insertId;
  },

  obtenerPorUsuario: async (id_usuario) => {
    const query = `SELECT * FROM respuestas WHERE id_usuario = ? ORDER BY id_respuesta ASC`;
    const [rows] = await pool.query(query, [id_usuario]);
    return rows;
  },

  obtenerPorSession: async (session_id) => {
    const query = `SELECT * FROM respuestas WHERE session_id = ? ORDER BY id_respuesta ASC`;
    const [rows] = await pool.query(query, [session_id]);
    return rows;
  },

  asociarSessionAUsuario: async (session_id, id_usuario) => {
    const query = `
      UPDATE respuestas
      SET id_usuario = ?
      WHERE session_id = ?
    `;
    await pool.query(query, [id_usuario, session_id]);
  }

};

module.exports = AdminRespuestas;
