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

    Users.checkDuplicated(req.db, item.username)
        .then(function (total) {
            if (total > 0) {
                res.send({ok: false, msg: 'ข้อมูลซ้ำ'});
            } else {
                Users.save(req.db, item)
                    .then(function () {
                        res.send({ok: true});
                    }, function (err) {
                        res.send({ok: false, msg: err});
                    });
            }
        }, function (err) {
            res.send({ok: false, msg: err});
        });

});

router.post('/delete', function (req, res) {
    var id = req.body.id;

    Users.remove(req.db, id)
        .then(function () {
            res.send({ok: true});
        }, function (err) {
            res.send({ok: false, msg: err});
        });

});

router.post('/edit', function (req, res) {

    var id = req.body.id;

    Users.edit(req.db, id)
        .then(function (rows) {
            res.send({ok: true, users: rows});
        }, function (err) {
            res.send({ok: false, msg: err});
        });

});


router.post('/save_edit', function (req, res) {

    var id = req.body.id;
    var fullname = req.body.fullname;
    var active = req.body.active;

    Users.saveEdit(req.db, id, fullname, active)
        .then(function () {
            res.send({ok: true});
        }, function (err) {
            res.send({ok: false, msg: err});
        });

});

router.get('/uploads', function (req, res) {
    res.render('uploads');
});

router.post('/douploads', function (req, res) {
    res.send(req.body);
});

router.get('/charts', function (req, res) {
    res.render('charts');
});

router.post('/getchart', function (req, res) {
    Users.charts(req.db)
        .then(function (data) {
            res.send({ok: true, rows: data});
        }, function (err) {
            res.send({ok: false, msg: err});
        });
});

module.exports = router;
