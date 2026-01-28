const app = require('./app');
const { port } = require('./config/env');
const logger = require('./utils/logger');

app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});
