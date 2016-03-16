'use strict';

var app = require('../..');
import request from 'supertest';

var newSoccerField;

describe('SoccerField API:', function() {

  describe('GET /api/soccer_fields', function() {
    var soccerFields;

    beforeEach(function(done) {
      request(app)
        .get('/api/soccer_fields')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          soccerFields = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(soccerFields).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/soccer_fields', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/soccer_fields')
        .send({
          name: 'New SoccerField',
          info: 'This is the brand new soccerField!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSoccerField = res.body;
          done();
        });
    });

    it('should respond with the newly created soccerField', function() {
      expect(newSoccerField.name).to.equal('New SoccerField');
      expect(newSoccerField.info).to.equal('This is the brand new soccerField!!!');
    });

  });

  describe('GET /api/soccer_fields/:id', function() {
    var soccerField;

    beforeEach(function(done) {
      request(app)
        .get('/api/soccer_fields/' + newSoccerField._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          soccerField = res.body;
          done();
        });
    });

    afterEach(function() {
      soccerField = {};
    });

    it('should respond with the requested soccerField', function() {
      expect(soccerField.name).to.equal('New SoccerField');
      expect(soccerField.info).to.equal('This is the brand new soccerField!!!');
    });

  });

  describe('PUT /api/soccer_fields/:id', function() {
    var updatedSoccerField;

    beforeEach(function(done) {
      request(app)
        .put('/api/soccer_fields/' + newSoccerField._id)
        .send({
          name: 'Updated SoccerField',
          info: 'This is the updated soccerField!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSoccerField = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSoccerField = {};
    });

    it('should respond with the updated soccerField', function() {
      expect(updatedSoccerField.name).to.equal('Updated SoccerField');
      expect(updatedSoccerField.info).to.equal('This is the updated soccerField!!!');
    });

  });

  describe('DELETE /api/soccer_fields/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/soccer_fields/' + newSoccerField._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when soccerField does not exist', function(done) {
      request(app)
        .delete('/api/soccer_fields/' + newSoccerField._id)
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
