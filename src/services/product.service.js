const { productModel } = require('');

const findAll = () => {
  const products = await productModel.findAll();
};

module.exports = {
  findAll,
};