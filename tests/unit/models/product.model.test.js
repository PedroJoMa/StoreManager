const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productModel } = require('../../../src/models');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productModel.findAll();
    //Assert
    expect(result).to.be.deep.equal(products);
  });
  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productModel.findById(1);
    //Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
