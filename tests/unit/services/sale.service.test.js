const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models')

const { allSales } = require('./mocks/sale.service.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Listagem de vendas', function () {
    it('Retorna a lista de vendas', async function () {
      // Arrange
      sinon.stub(saleModel, 'findAll').resolves(allSales);
      // Act
      const result = await saleService.findAll();
      // Assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });
  describe('Busca de uma venda por id', function () {
    it('Retorna um erro caso receba um ID inválido', async function () {
      // Arrange
      // Act
      const result = await saleService.findById('trybe')
      // Assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Retorna um erro caso a venda não exista', async function () {
      // Arrange
      sinon.stub(saleModel, 'findById').resolves(undefined);
      // Act
      const result = await saleService.findById(1);
      // Assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    it('Retorna a venda caso ID seja existente', async function () {
      // Arrange
      sinon.stub(saleModel, 'findById').resolves(allSales[0]);
      // Act
      const result = await saleService.findById(1);
      // Assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSales[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});