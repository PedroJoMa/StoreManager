const express = require('express');

const { productController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');
const validateUpdateProductFields = require('../middlewares/validateUpdateProductFields');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProduct,
);

router.post(
  '/',
  validateNewProductFields,
  productController.createProduct,
);

router.put(
  '/:id',
  validateNewProductFields,
  validateUpdateProductFields,
  productController.changeData,
);

router.delete(
  '/:id',
  validateUpdateProductFields,
  productController.deleteProduct,
);

module.exports = router;