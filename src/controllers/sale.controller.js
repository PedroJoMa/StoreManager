const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) {
    return res.status(errorMap.mapError(type)).json(message);
  }
  res.status(200).json(message);
};

// const createSale = async (req, res) => {
//   const salesList = req.body;
//   const response = salesList.map(async (sale) => {
//     const { productId, quantity } = sale;

//     const { type, message } = await saleService.createSale(productId, quantity);

//     if (type) {
//       return res.status(errorMap(type)).json(message);
//     }

//     return res.status(201).json(message);
//   });
//   return response;
// };
module.exports = {
  listSales,
  // createSale,
};
