const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, searchById } = require('./mocks/sale.model.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await saleModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });
  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[searchById]])
    // Act
    const result = await saleModel.findById(2);
    // Assert
    expect(result).to.deep.equal([searchById]);
  });

  afterEach(function () {
    sinon.restore();
  });
});