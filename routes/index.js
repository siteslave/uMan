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

router.get('/partials/main', function (req, res) {
    res.render('users/main');
});

router.get('/partials/new', function (req, res) {
    res.render('users/new');
});

router.get('/partials/edit', function (req, res) {
    res.render('users/edit');
});

router.post('/save', function (req, res) {
    var user = req.body.user;

    var crypto = require('crypto');
    var encryptPassword = crypto.createHash('md5').update(user.password).digest('hex');

    var item = {};

    item.username = user.username;
    item.fullname = user.fullname;
    item.password = encryptPassword;
    item.active = user.active;

    Users.save(req.db, item)
        .then(function () {
            res.send({ok: true});
        }, function (err) {
            res.send({ok: false, msg: err});
        });
});


module.exports = router;
