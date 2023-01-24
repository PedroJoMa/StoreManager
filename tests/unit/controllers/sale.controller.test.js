const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');

const { 
  saleMock,
  newSaleMock,
  saleListMock,
 } = require('./mocks/product.controller.mock');

describe('Teste de unidade do controller de vendas', function() {
  describe('Listando produtos', function() {
    it('Verifica se retorna status 200 e a lista de vendas', async function () {
      // Arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: saleListMock });
      // Act
        await saleController.listSales(req, res);
      // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(saleListMock);
    });
  });

  describe('Buscando uma venda', function () {
    it('Verifica se ao passar um id existente o banco de dados retorna a venda', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: null, message: newSaleMock });

      // Act
      await saleController.getSale(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newSaleMock);
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
        .stub(saleService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await saleController.getSale(req, res);

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
        .stub(saleService, 'findById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      // Act
      await saleController.getSale(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found'});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
