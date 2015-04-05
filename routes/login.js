var express = require('express');
var router = express.Router();
var Users = require('../models/User');
var _ = require('lodash');

// GET /login
// req = request, res = response
router.get('/', function (req, res) {
    // เรียกใช้งาน views/users/login.jade
    res.render('users/login', { msg: req.session.error });
});

router.post('/dologin2', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    // encrypt password
    var crypto = require('crypto');
    var encryptPassword = crypto.createHash('md5').update(password).digest('hex');

    Users.doLogin(req.db, username, encryptPassword)
        .then(function (data) {
            // success
            if (_.size(data)) {

                req.session.username = data.username;
                req.session.fullname = data.fullname;

                res.redirect('/');

            } else {
                req.session.error = 'Login failed';
                res.redirect('/login');
            }
        }, function (err) {
            // error
            req.session.error = 'Server error';
            res.redirect('/login');
        });

});

// POST /login/dologin
router.post('/dologin', function (req, res) {
    // รับค่าจาก ผู้ใช้งานผ่าน Ajax
    var _password = req.body.password;
    var _username = req.body.username;

    // เข้ารหัส รหัสผ่าน
    var crypto = require('crypto');
    var strPass = crypto.createHash('md5').update(_password).digest('hex');

    // เรียกใช้งาน model (var Users = require('../models/User');)
    Users.doLogin(req.db, _username, strPass)
        .then(function(data) {
            if(_.size(data)) {
                // session
                req.session.logged = true;
                req.session.username = data.username;
                req.session.fullname = data.fullname;

                res.send({ok: true, user: data});
                //res.redirect('/');
            } else {
                res.send({ok: false});
            }
        }, function(err) {
            res.send({ok: false, msg: err});
        });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});

module.exports = router;
