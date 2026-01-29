require('express-async-errors');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('./middlewares/errorHandler');
const { sessionSecret } = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
  })
);

app.use('/users', require('./routes/user.routes'));

app.use(errorHandler);

module.exports = app;
