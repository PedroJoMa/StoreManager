const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const {
  invalidValue,
  validName,
  allProducts,
} = require('./mocks/product.service.mock');

describe('Verificando service de produtos', function () {
  describe('Listagem de produtos', function () {
      it('retorna a lista completa de produtos', async function () {
      // arrange
        sinon.stub(productModel, 'findAll').resolves(allProducts);
      // act
        const result = await productService.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Busca por um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productService.findById('tribo');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(undefined);
     
      // act
      const result = await productService.findById(1);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID seja existente', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      
      // act
      const result = await productService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  })

  describe('Cadastro de um produto com valores válidos', function () {
    it('retorna o id do produto cadastrado', async function () {
      // arrange
      sinon.stub(productModel, 'insert').resolves(1);
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);

      // act
      const result = await productService.createProduct(validName);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
      });
  });

  describe('Cadastro de um produto com valores inválidos', function () {
    it('Retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await passengerService.createProduct(invalidValue);

      // assert 
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long')
    });
  });
  afterEach(function () {
     sinon.restore();
   });
});