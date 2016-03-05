'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var picnicTableCtrlStub = {
  index: 'picnicTableCtrl.index',
  show: 'picnicTableCtrl.show',
  create: 'picnicTableCtrl.create',
  update: 'picnicTableCtrl.update',
  destroy: 'picnicTableCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var picnicTableIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './picnic_table.controller': picnicTableCtrlStub
});

describe('PicnicTable API Router:', function() {

  it('should return an express router instance', function() {
    expect(picnicTableIndex).to.equal(routerStub);
  });

  describe('GET /api/picnic_tables', function() {

    it('should route to picnicTable.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'picnicTableCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/picnic_tables/:id', function() {

    it('should route to picnicTable.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'picnicTableCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/picnic_tables', function() {

    it('should route to picnicTable.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'picnicTableCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/picnic_tables/:id', function() {

    it('should route to picnicTable.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'picnicTableCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/picnic_tables/:id', function() {

    it('should route to picnicTable.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'picnicTableCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/picnic_tables/:id', function() {

    it('should route to picnicTable.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'picnicTableCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
