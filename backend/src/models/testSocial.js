const pool = require("./mysql");

const TestSocial = {
  async crear({ dia, horas }) {
    const [result] = await pool.query(
      `INSERT INTO social (dia, horas)
       VALUES (?, ?)`,
      [dia, horas]
    );

    return result.insertId;
  },
};

module.exports = TestSocial;
