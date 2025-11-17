const pool = require("./mysql");

const TestTrabajo = {
  async crear({ dia, horas }) {
    const [result] = await pool.query(
      `INSERT INTO trabajo (dia, horas)
       VALUES (?, ?)`,
      [dia, horas]
    );

    return result.insertId;
  },
};

module.exports = TestTrabajo;
