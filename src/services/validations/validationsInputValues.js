const { productModel } = require('../../models');
const { idSchema, addProductSchema, addSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema
    .validate({ name });
  if (error) { 
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

const validateNewSale = (productId, quantity) => {
  const { error } = addSaleSchema
    .validate({ productId, quantity });
  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

const validateInputValues = async ({ id, name }) => {
  const product = await productModel.findById(id);
  const inputId = validateId(id);
  const inputName = validateNewProduct(name);
  
  if (inputId.type === 'INVALID_VALUE') {
    return inputId;
  }
  
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  if (inputName.type === 'INVALID_VALUE') {
    return inputName;
  }

  return { type: null, message: '' };
};

const idToDelete = async (productId) => {
  const inputId = validateId(productId);
  const product = await productModel.findById(productId);

  if (inputId.type === 'INVALID_VALUE') {
    return inputId;
  }

  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  validateInputValues,
  idToDelete,
};