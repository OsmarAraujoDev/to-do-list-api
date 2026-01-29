const db = require('../config/database');

const taskModel = {
  async create({
    title,
    description,
    statusId,
    filePath,
    userId
  }) {
    const query = `
      INSERT INTO tasks (
        title,
        description,
        status_id,
        file_path,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      title,
      description || null,
      statusId,
      filePath || null,
      userId
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async findAllByUser(userId, filters = {}) {
    const conditions = ['t.user_id = $1'];
    const values = [userId];
    let idx = 2;

    if (filters.id) {
      conditions.push(`t.task_id = $${idx}`);
      values.push(filters.id);
      idx++;
    }

    if (filters.title) {
      conditions.push(`t.title ILIKE $${idx}`);
      values.push(`%${filters.title}%`);
      idx++;
    }

    if (filters.created_at_start) {
      conditions.push(`t.created_at >= $${idx}`);
      values.push(filters.created_at_start);
      idx++;
    }

    if (filters.created_at_end) {
      conditions.push(`t.created_at <= $${idx}`);
      values.push(filters.created_at_end);
      idx++;
    }

    const limit = filters.limit ? Number(filters.limit) : 20;
    const offset = filters.offset ? Number(filters.offset) : 0;

    const order =
    filters.order && filters.order.toUpperCase() === 'ASC'
      ? 'ASC'
      : 'DESC';

    const query = `
      SELECT
        t.task_id,
        t.title,
        t.description,
        t.status_id,
        ts.status_name,
        t.created_at,
        t.updated_at,
        t.closed_at,
        t.file_path
      FROM tasks t
      JOIN task_status ts ON ts.status_id = t.status_id
      WHERE ${conditions.join(' AND ')}
      ORDER BY t.task_id ${order}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const { rows } = await db.query(query, values);
    return rows;
  },

  async findById(taskId, userId) {
    const query = `
      SELECT
        t.*,
        ts.status_name
      FROM tasks t
      JOIN task_status ts ON ts.status_id = t.status_id
      WHERE t.task_id = $1
        AND t.user_id = $2
      LIMIT 1
    `;

    const { rows } = await db.query(query, [taskId, userId]);
    return rows[0];
  },

  async update(taskId, userId, fields) {
    const sets = [];
    const values = [];
    let idx = 1;

    for (const key in fields) {
      sets.push(`${key} = $${idx}`);
      values.push(fields[key]);
      idx++;
    }

    values.push(taskId, userId);

    const query = `
      UPDATE tasks
      SET ${sets.join(', ')}, updated_at = NOW()
      WHERE task_id = $${idx}
        AND user_id = $${idx + 1}
      RETURNING *
    `;

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async delete(taskId, userId) {
    const query = `
      DELETE FROM tasks
      WHERE task_id = $1
        AND user_id = $2
    `;

    await db.query(query, [taskId, userId]);
  }
};

module.exports = taskModel;
