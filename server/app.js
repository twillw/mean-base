'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    dbclient = require('./db/dbclient'),
    fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose'),
    config = require('./config/environment'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');

// Include Controllers
var authCtrl = require('./controllers/AuthCtrl'),
    baseCtrl = require('./controllers/BaseCtrl'),
    userCtrl = require('./controllers/UserCtrl');

var app = express();
var env = app.get('env');

var server = http.createServer(app).listen(9000);

// Connect to database
dbclient.initialize(config.mongo.uri, function(err) {
  if (err) {
    return console.log("ERROR: Initializing DB");
  }
  // Populate DB with sample data
  if(config.seedDB) { require('./config/seed'); }

  // Setup server

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('common'));
  }
  if ('development' === env || 'test' === env || 'staging' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
  }

  /*******************************
   * Register routers here
   *******************************/

  // Basic API endpoints - require authentication
  var apiRouter = express.Router();
  apiRouter.use(bodyParser.urlencoded({ extended: false }));
  apiRouter.use(bodyParser.json());
  apiRouter.use(cookieParser());
  // register middleware to authenticate all incoming requests 
  // for this router
  apiRouter.use(authCtrl.authenticate);

  // Register controller routes on router
  baseCtrl.register(apiRouter);


  // Routes NOT requiring authentication
  var authRouter = express.Router();
  authRouter.use(bodyParser.urlencoded({ extended: false }));
  authRouter.use(bodyParser.json());
  authRouter.use(cookieParser());

  // Register controller routes on router
  authCtrl.register(authRouter);
  userCtrl.register(authRouter);

  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

  app.use('/assets', express.static(__dirname + '/../assets'));

  // All other routes should redirect to the index.html
  app.route('/*')
  .get(function(req, res) {
    res.sendFile(config.root + '/' + app.get('appPath') + '/index.html');
  });      

  // Start server
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

  // Expose app
  exports = module.exports = app;

});

