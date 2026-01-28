const { Pool } = require('pg');
const { database } = require('./env');

const pool = new Pool({
  host: database.host,
  port: database.port,
  user: database.user,
  password: database.password,
  database: database.name
});

module.exports = pool;
