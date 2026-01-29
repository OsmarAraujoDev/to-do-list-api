const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Erro interno do servidor'
  });
};
