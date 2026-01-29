const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const logger = require('../utils/logger');

const SALT_ROUNDS = 10;

const userService = {
  async register({ nickname, email, password, phone }) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      const error = new Error('Email já cadastrado');
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userModel.create({
      nickname,
      email,
      passwordHash,
      phone
    });

    logger.info(`Usuário cadastrado: ${email}`);

    return user;
  },

  async login({ email, password }, session) {
    const user = await userModel.findByEmail(email);

    if (!user) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }

    session.user = {
      id: user.user_id,
      nickname: user.nickname,
      email: user.email
    };

    await userModel.updateLastLogin(user.user_id);

    logger.info(`Login realizado: ${email}`);

    return session.user;
  },

  async logout(session) {
    return new Promise((resolve, reject) => {
      session.destroy(err => {
        if (err) {
          logger.error('Erro ao destruir sessão', err);
          return reject(err);
        }
        resolve();
      });
    });
  }
};

module.exports = userService;
