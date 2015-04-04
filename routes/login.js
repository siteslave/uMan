var express = require('express');
var router = express.Router();
// /login
router.get('/', function (req, res) {
    res.render('users/login');
});

module.exports = router;
