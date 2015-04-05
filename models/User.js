
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

exports.checkDuplicated = function (db, username) {
    var q = Q.defer();

    db('users')
        .count('* as total')
        .where('username', username)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0].total);
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

exports.remove = function (db, id) {
    var q = Q.defer();

    db('users')
        .delete()
        .where('id', id)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.edit = function (db, id) {
    var q = Q.defer();

    db('users')
        .select('username', 'fullname', 'active')
        .where('id', id)
        .limit(1)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows[0]);
        });

    return q.promise;
};

exports.saveEdit = function (db, id, fullname, active) {
    var q = Q.defer();

    db('users')
        .update({
            fullname: fullname,
            active: active
        })
        .where('id', id)
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
}
