var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Include route file
var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'SecretKey))))',
    resave: false,
    saveUninitialized: true
}));

// Database connection
var db = require('knex')({
   client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'userman',
        user: 'root',
        password: '789124'
    }
});

app.use(function (req, res, next) {
    req.db = db;
    next();
});

var auth = function (req, res, next) {
    if (req.session.username) {
        next();
    } else {
        req.session.fullname = 'Test Test';
        req.username = 'Test'
        next();
        //res.redirect('/login');
    }
};

// Route mapping
app.use('/users', auth, users);
app.use('/login', login);
app.use('/', auth, index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
