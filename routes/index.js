var express = require('express');
var router = express.Router();

var Users = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    // views/index.jade
    res.render('index', { title: 'User Management System', fullname: req.session.fullname });
});
// /all
router.get('/all', function (req, res) {
    Users.all(req.db)
        .then(function (rows) {
            res.send({ok: true, rows: rows});
        }, function (err) {
            res.send({ok: false, msg: err});
        });
});

module.exports = router;
