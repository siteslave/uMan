var express = require('express');
var router = express.Router();
var Users = require('../models/User');
var _ = require('lodash');
// GET /login
router.get('/', function (req, res) {
    res.render('users/login', {username: req.session.username});
});
// POST /login
router.post('/dologin', function (req, res) {
    var crypto = require('crypto');
    var strPass = crypto.createHash('md5').update(req.body.password).digest('hex');

    var username = req.body.username;

    Users.doLogin(req.db, username, strPass)
        .then(function(data) {
            if(_.size(data)) {

                // session
                req.session.username = username;
                req.session.fullname = data[0].fullname;
                res.send({ok: true, user: data});
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
