const productMock = {
  name: "Martelo de Thor",
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];
  
module.exports = {
  productMock,
  newProductMock,
  productListMock,
};