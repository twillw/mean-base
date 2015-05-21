'use strict';

var _ = require('lodash'),
    async = require('async'),
    Auth = require('./AuthCtrl'),
    config = require('../config/environment'),
    dateTime = require('../utils/dateTime'),
    db = require('../db/dbclient'),
    randToken = require('rand-token');

function validationError (res, err) {
  console.log(err);
  return res.json(422, err);
};

var User = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
User.index = function(req, res) {
  var role = req.query.role || 'user';
  db.User.find(function (err, users) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(users);
    }
  });
};

/**********************
 *** Private methods **
 **********************/

/**********************
 *** Declare Routes  **
 **********************/

exports.register = function(router) {
  router.get('/users', Auth.authenticate, User.index);
}
