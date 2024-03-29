const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSaleSchema = Joi.object({
  productId: Joi.number().integer().min(1),
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};