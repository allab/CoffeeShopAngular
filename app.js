var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongodb = require('mongodb');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');



var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test2', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
 app.use(methodOverride());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
 app.use(morgan('dev'));                                         // log every request to the console

  app.use(bodyParser.urlencoded({ extended: false })); // parse application/vnd.api+json as json
  app.use(bodyParser.json());
   app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use('/', routes);
app.use('/users', users);
app.use('/products', products);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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



var port = 3000;//(process.env.VCAP_APP_PORT || 1337);
var host = (process.env.VCAP_APP_HOST || '0.0.0.0');



// Create Web server and listen on port 1337
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + port);
});

module.exports = app;
