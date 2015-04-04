var express = require('express');
var router = express.Router();

/**
 * GET /users
 */
router.get('/', function(req, res) {
  res.render('users/index', {fullname: req.session.fullname, title: 'User admin'});
});

/**
 * GET /users/new
 */
router.get('/new', function(req, res) {
  res.render('users/new');
});

module.exports = router;
