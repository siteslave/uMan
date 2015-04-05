
var Q = require('q');

exports.doLogin = function (db, username, password) {
    var q = Q.defer();

    db('users')
        .select('username', 'fullname')
        .where('username', username)
        .where('password', password)
        .where('active', 'Y')
        .limit(1)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};

exports.all = function (db) {

    var q = Q.defer();

    db('users')
        .select('username', 'fullname', 'active', 'id')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;

};

exports.save = function (db, user) {
    var q = Q.defer();

    db('users')
        .insert(user)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};
