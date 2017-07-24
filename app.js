var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring');
var schema = mongoose.Schema;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var UserSchema = new schema({
	_id : String,
	name : String,
	kakao_token : String,
	options : {
		feature_lock : Boolean,
		vibration : Boolean,
		flash : Boolean,
		tts : {
			value : Boolean,
			text : String
		},
		alarm : Boolean
	},
	online : Boolean
});

mongoose.connect("mongodb://localhost:27017/sunrinton", function(err){
	if(err){
		throw err;
	}
	console.log("DB Server Connect Success");
});

var User = mongoose.model('users', UserSchema);

require('./routes/auth.js')(app, User);
require('./routes/alert.js')(app, User);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

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
