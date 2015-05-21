/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

var db = require('../db/dbclient'),
    crypto = require('crypto');

db.User.remove({email:'admin@admin.com'}, function() {
  var salt = makeSalt();

  db.User.insert({
    role: 'admin',
    name: {
      first: "Super",
      last: "Admin"
    },
    token: 'admin',
    email: 'admin@admin.com',
    salt: salt,
    hashedPassword: encryptPassword('admin', salt)
  });
});

function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
};

function encryptPassword(password, salt) {
  if (!password || !salt) return '';
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}
