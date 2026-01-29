const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required(),

  description: Joi.string()
    .max(300)
    .optional()
    .allow(null, ''),

  status_id: Joi.number()
    .integer()
    .positive()
    .optional()
});

const updateTaskSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .optional(),

  description: Joi.string()
    .max(300)
    .optional()
    .allow(null, ''),

  status_id: Joi.number()
    .integer()
    .positive()
    .optional(),

  closed_at: Joi.date()
    .optional()
    .allow(null)
});

const listTasksQuerySchema = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(20),

  offset: Joi.number()
    .integer()
    .min(0)
    .default(0),

  order: Joi.string().valid('asc', 'desc').trim(),

  id: Joi.number()
    .integer()
    .positive(),

  title: Joi.string()
    .max(100)
    .trim(),

  created_at_start: Joi.date()
    .iso(),

  created_at_end: Joi.date()
    .iso()
})
  .and('created_at_start', 'created_at_end')
  .options({
    abortEarly: false,
    allowUnknown: false
  });

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema
};
