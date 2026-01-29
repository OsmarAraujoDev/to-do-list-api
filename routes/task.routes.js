const express = require('express');
const taskController = require('../controllers/task.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/upload');
const {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema
} = require('../validations/task.validation');

const router = express.Router();

router.use(auth);

router.post(
  '/',
  upload.single('file'),
  validate(createTaskSchema),
  taskController.create
);

router.get('/', validate(listTasksQuerySchema, 'query'), taskController.list);

router.put(
  '/:id',
  upload.single('file'),
  validate(updateTaskSchema),
  taskController.update
);

router.delete('/:id', taskController.remove);

module.exports = router;
