'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var soccerFieldCtrlStub = {
  index: 'soccerFieldCtrl.index',
  show: 'soccerFieldCtrl.show',
  create: 'soccerFieldCtrl.create',
  update: 'soccerFieldCtrl.update',
  destroy: 'soccerFieldCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var soccerFieldIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './soccer_field.controller': soccerFieldCtrlStub
});

describe('SoccerField API Router:', function() {

  it('should return an express router instance', function() {
    expect(soccerFieldIndex).to.equal(routerStub);
  });

  describe('GET /api/soccer_fields', function() {

    it('should route to soccerField.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'soccerFieldCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/soccer_fields/:id', function() {

    it('should route to soccerField.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'soccerFieldCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/soccer_fields', function() {

    it('should route to soccerField.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'soccerFieldCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/soccer_fields/:id', function() {

    it('should route to soccerField.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'soccerFieldCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/soccer_fields/:id', function() {

    it('should route to soccerField.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'soccerFieldCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/soccer_fields/:id', function() {

    it('should route to soccerField.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'soccerFieldCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
