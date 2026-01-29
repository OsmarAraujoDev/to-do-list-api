const taskModel = require('../models/task.model');

const taskService = {
  async create(data) {
    return taskModel.create(data);
  },

  async list(userId, filters) {
    return taskModel.findAllByUser(userId, filters);
  },

  async update(taskId, userId, data) {
    const task = await taskModel.findById(taskId, userId);

    if (!task) {
      const error = new Error('Task não encontrada');
      error.statusCode = 404;
      throw error;
    }

    return taskModel.update(taskId, userId, data);
  },

  async remove(taskId, userId) {
    const task = await taskModel.findById(taskId, userId);

    if (!task) {
      const error = new Error('Task não encontrada');
      error.statusCode = 404;
      throw error;
    }

    await taskModel.delete(taskId, userId);
  }
};

module.exports = taskService;
