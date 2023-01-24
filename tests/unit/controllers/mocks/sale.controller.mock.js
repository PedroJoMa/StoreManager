const saleMock = {
  date: "2023-01-24T18:42:23.000Z",
  productId: 1,
  quantity: 5,
};

const newSaleMock = {saleId: 1, ...saleMock};

const saleListMock = [newSaleMock];

module.exports = {
  saleMock,
  newSaleMock,
  saleListMock,
};