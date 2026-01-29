const taskService = require('../services/task.service');

const taskController = {
  async create(req, res) {
    const { title, description, status_id } = req.body;
    const userId = req.session.user.id;

    const filePath = req.file ? req.file.path : null;

    const task = await taskService.create({
      title,
      description,
      statusId: status_id || 1,
      filePath,
      userId
    });

    return res.status(201).json({
      message: 'Task criada com sucesso',
      task
    });
  },

  async list(req, res) {
    const userId = req.session.user.id;
    const filters = req.query;

    const tasks = await taskService.list(userId, filters);

    return res.status(200).json({
      count: tasks.length,
      tasks
    });
  },

  async update(req, res) {
    const { id } = req.params;
    const userId = req.session.user.id;

    const fields = {
      title: req.body.title,
      description: req.body.description,
      status_id: req.body.status_id,
      closed_at: req.body.closed_at
    };

    if (req.file) {
      fields.file_path = req.file.path;
    }

    Object.keys(fields).forEach(
      key => fields[key] === undefined && delete fields[key]
    );

    const task = await taskService.update(id, userId, fields);

    return res.status(200).json({
      message: 'Task atualizada com sucesso',
      task
    });
  },

  async remove(req, res) {
    const { id } = req.params;
    const userId = req.session.user.id;

    await taskService.remove(id, userId);

    return res.status(200).json({
      message: 'Task removida com sucesso'
    });
  }
};

module.exports = taskController;
