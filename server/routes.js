/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/picnic_tables', require('./api/picnic_table'));
  app.use('/api/recommendations', require('./api/recommendation'));
  app.use('/api/playgrounds', require('./api/playground'));
  app.use('/api/spray_parks', require('./api/spray_park'));
  app.use('/api/picnic_tables', require('./api/picnic_tables'));
  app.use('/api/parklands', require('./api/parkland'));
  app.use('/api/trees', require('./api/tree'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
