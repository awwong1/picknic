/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/soccer_fields              ->  index
 * POST    /api/soccer_fields              ->  create
 * GET     /api/soccer_fields/:id          ->  show
 * PUT     /api/soccer_fields/:id          ->  update
 * DELETE  /api/soccer_fields/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import SoccerField from './soccer_field.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of SoccerFields
export function index(req, res) {
  SoccerField.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SoccerField from the DB
export function show(req, res) {
  SoccerField.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SoccerField in the DB
export function create(req, res) {
  SoccerField.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SoccerField in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SoccerField.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SoccerField from the DB
export function destroy(req, res) {
  SoccerField.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
