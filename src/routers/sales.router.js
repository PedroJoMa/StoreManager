const express = require('express');

const { saleController } = require('../controllers');
// const { validateNewSaleFields } = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.get(
  '/',
  saleController.listSales,
);

// router.post(
//   '/',
//   validateNewSaleFields,
//   saleController.createSale,
// );

module.exports = router;