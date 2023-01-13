const { productService } = require('');

const listProducts = async (_req, res) => {
  const { } = await productService.findAll();

};

module.exports = {

};