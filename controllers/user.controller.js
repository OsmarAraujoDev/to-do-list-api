const userService = require('../services/user.service');

const userController = {
  async register(req, res) {
    const { nickname, email, password, phone } = req.body;

    const user = await userService.register({
      nickname,
      email,
      password,
      phone
    });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user
    });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await userService.login(
      { email, password },
      req.session
    );

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      user
    });
  },

  async logout(req, res) {
    await userService.logout(req.session);

    return res.status(200).json({
      message: 'Logout realizado com sucesso'
    });
  }
};

module.exports = userController;
