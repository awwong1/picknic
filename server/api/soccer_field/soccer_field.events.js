/**
 * SoccerField model events
 */

'use strict';

import {EventEmitter} from 'events';
var SoccerField = require('./soccer_field.model');
var SoccerFieldEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SoccerFieldEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SoccerField.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SoccerFieldEvents.emit(event + ':' + doc._id, doc);
    SoccerFieldEvents.emit(event, doc);
  }
}

export default SoccerFieldEvents;
