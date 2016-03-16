/**
 * PicnicTable model events
 */

'use strict';

import {EventEmitter} from 'events';
var PicnicTable = require('./picnic_table.model');
var PicnicTableEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PicnicTableEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PicnicTable.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PicnicTableEvents.emit(event + ':' + doc._id, doc);
    PicnicTableEvents.emit(event, doc);
  }
}

export default PicnicTableEvents;
