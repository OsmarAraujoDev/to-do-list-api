const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: env === 'production' ? '.env.production' : '.env.development'
});

module.exports = {
  env,
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  sessionSecret: process.env.SESSION_SECRET
};
