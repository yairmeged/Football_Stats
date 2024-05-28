const Joi = require("joi");

const playerSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
  })
  .unknown(false);

module.exports = { playerSchema };
