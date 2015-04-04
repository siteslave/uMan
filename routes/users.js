var express = require('express');
var router = express.Router();

/**
 * GET /users
 */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

/**
 * GET /users/new
 */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

module.exports = router;
