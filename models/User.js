
var Q = require('q');

exports.doLogin = function (db, username, password) {

    var q = Q.defer();
    db('users')
        .select('username', 'fullname')
        .where('username', username)
        .where('password', password)
        .where('active', 'Y')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};