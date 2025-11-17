const pool = require("./mysql");

const TestSueño = {
  async crear({ dia, horas }) {
    const [result] = await pool.query(
      `INSERT INTO sueño (dia, horas)
       VALUES (?, ?)`,
      [dia, horas]
    );

    return result.insertId;
  },
};

module.exports = TestSueño;
