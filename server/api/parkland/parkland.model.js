'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ParklandSchema = new Schema({
  properties: {
    common: String,
    address: String,
    official: String
  },
  geometry: {
    coordinates: []
  }
});

module.exports = mongoose.model('Parkland', ParklandSchema);
