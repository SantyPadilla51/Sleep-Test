const pool = require("./mysql");

const Diagnostico = {
  async crear({ tipoDeTabla, descripcion1, descripcion2 }) {
    const [result] = await pool.query(
      `INSERT INTO diagnostico (tipoDeTabla, descripcion1, descripcion2)
       VALUES (?, ?, ?)`,
      [tipoDeTabla, descripcion1, descripcion2]
    );

    return result.insertId;
  },

  async obtener() {
    const [rows] = await pool.query(
      `SELECT * FROM diagnostico`
    );
    return rows;
  },

  async borrar(id) {
  const [result] = await pool.query(
    `DELETE FROM diagnostico WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0; // true si se eliminó
}
};

module.exports = Diagnostico;
