'use strict';

var express = require('express');
var controller = require('./recommendation.controller');

var router = express.Router();

router.get('/:longitude/:latitude', controller.location);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;