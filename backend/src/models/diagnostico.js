const pool = require("./mysql");

const Diagnostico = {
  async crear({ tipoDeTabla, descripcion1, descripcion2}) {
    const [result] = await pool.query(
      `INSERT INTO diagnostico (tipoDeTabla, descripcion1, descripcion2)
       VALUES (?, ?, ?)`,
      [tipoDeTabla, descripcion1, descripcion2]
    );

    return result.insertId;
  },

};

module.exports = Diagnostico;
