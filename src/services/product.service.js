const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);

  if (error.type) return error;

  const product = await productModel.findById(productId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateById = async ({ id, name }) => {
  const error = await schema.validateInputValues({ id, name });

  if (error.type) {
    return error;
  }

  await productModel.updateById({ id, name });
  const result = await productModel.findById(id);

  return { type: null, message: result };
};

const deleteById = async (productId) => {
  const error = await schema.idToDelete(productId);

  if (error.type) {
    return error;
  }

  await productModel.deleteById(productId);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
  deleteById,
};