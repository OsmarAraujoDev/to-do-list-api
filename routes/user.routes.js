const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const {
  registerSchema,
  loginSchema
} = require('../validations/user.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.post('/logout', userController.logout);

module.exports = router;
