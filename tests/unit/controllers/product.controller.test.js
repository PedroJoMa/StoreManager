const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const {
  productMock,
  newProductMock,
  productListMock,
} = require('./mocks/product.controller.mock');

describe('Teste de unidade do productController', function () {
  describe('Listando produtos', function () {
    it('Verifica se retorna status 200 e a lista de produtos', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: productListMock });

      // act
      await productController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });

  describe('Buscando um produto', function () {
    it('Verifica se ao passar um id existente o banco de dados retorna o produto', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: null, message: newProductMock });

      // Act
      await productController.getProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('Verifica se ao passar um id inválido retorna um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await productController.getProduct(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('Verifica se ao passar um id que não existente o banco deve retorna um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      // Act
      await productController.getProduct(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('Verifica se ao enviar dados válidos salva com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        body: productMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: null, message: newProductMock });
      
      // act
      await productController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
    it('Verifica se ao enviar um nome com menos de 5 caracteres retorna um erro', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: 't24b'
        } 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      
      // act
      await productController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('"name" length must be at least 5 characters long');
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});