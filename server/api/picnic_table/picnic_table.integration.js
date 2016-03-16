'use strict';

var app = require('../..');
import request from 'supertest';

var newPicnicTable;

describe('PicnicTable API:', function() {

  describe('GET /api/picnic_tables', function() {
    var picnicTables;

    beforeEach(function(done) {
      request(app)
        .get('/api/picnic_tables')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          picnicTables = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(picnicTables).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/picnic_tables', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/picnic_tables')
        .send({
          name: 'New PicnicTable',
          info: 'This is the brand new picnicTable!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPicnicTable = res.body;
          done();
        });
    });

    it('should respond with the newly created picnicTable', function() {
      expect(newPicnicTable.name).to.equal('New PicnicTable');
      expect(newPicnicTable.info).to.equal('This is the brand new picnicTable!!!');
    });

  });

  describe('GET /api/picnic_tables/:id', function() {
    var picnicTable;

    beforeEach(function(done) {
      request(app)
        .get('/api/picnic_tables/' + newPicnicTable._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          picnicTable = res.body;
          done();
        });
    });

    afterEach(function() {
      picnicTable = {};
    });

    it('should respond with the requested picnicTable', function() {
      expect(picnicTable.name).to.equal('New PicnicTable');
      expect(picnicTable.info).to.equal('This is the brand new picnicTable!!!');
    });

  });

  describe('PUT /api/picnic_tables/:id', function() {
    var updatedPicnicTable;

    beforeEach(function(done) {
      request(app)
        .put('/api/picnic_tables/' + newPicnicTable._id)
        .send({
          name: 'Updated PicnicTable',
          info: 'This is the updated picnicTable!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPicnicTable = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPicnicTable = {};
    });

    it('should respond with the updated picnicTable', function() {
      expect(updatedPicnicTable.name).to.equal('Updated PicnicTable');
      expect(updatedPicnicTable.info).to.equal('This is the updated picnicTable!!!');
    });

  });

  describe('DELETE /api/picnic_tables/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/picnic_tables/' + newPicnicTable._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when picnicTable does not exist', function(done) {
      request(app)
        .delete('/api/picnic_tables/' + newPicnicTable._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
