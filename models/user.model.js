const db = require('../config/database');

const userModel = {
  async create({ nickname, email, passwordHash, phone }) {
    const query = `
      INSERT INTO users (nickname, email, password_hash, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, nickname, email, phone, created_at
    `;

    const values = [nickname, email, passwordHash, phone || null];
    const { rows } = await db.query(query, values);

    return rows[0];
  },

  async findByEmail(email) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const { rows } = await db.query(query, [email]);
    return rows[0];
  },

  async updateLastLogin(userId) {
    const query = `
      UPDATE users
      SET last_login = NOW()
      WHERE user_id = $1
    `;

    await db.query(query, [userId]);
  }
};

module.exports = userModel;
