const { saleModel } = require('../models');
// const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

// const createSale = async (productId, quantity) => {
//   const error = schema.validateNewSale(productId, quantity);
//   if (error.type) { 
//     return error;
//    }

//   const newSaleId = await saleModel.insert({ productId, quantity });
//   const newSale = await saleModel.findById(newSaleId);
  
//   return { type: null, message: newSale };
// };

module.exports = {
  findAll,
  // createSale,
};