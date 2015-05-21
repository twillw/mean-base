'use strict';

var config = require('../config/environment'),
    crypto = require('crypto'),
    db = require('../db/dbclient');


var Auth = {};

Auth.login = function(req, res) {
  db.User.find({
    email: req.body.email
  }).toArray(function(err, users) {
    console.log(err);
    console.log(users);
    if (err || !users.length) {
      res.status(401).send({
        error: 'Your email/password is incorrect'
      });
    } else {
      var user = users[0];
      var auth = authenticate(req.body.password, user.salt, user.hashedPassword);
      if (auth) {
        res.json({token: user.token, id: user._id, role: user.role});
      } else {
        res.status(401).send({
          error: 'Your email/password is incorrect'
        });
      }
    }
  });
}

exports.authenticate = function(req, res, next) {
	// error on missing token
	var token = req.query.token || req.cookies.token;
	if (token === undefined || token === null) {
		res.status(401).send({
			error : 'api "token" parameter missing'
		});
		return;
	}

	// query user for matching token
	User.findOne({
			token: token
		}, function(err, user) {
			// fail on error
			if (err) {
				return next(err);
			} else if (user === null) {
				res.status(401).send({
					error : 'invalid "token" specified'
				});
			} else {
				// save user in request
				req.user = user;
	
				// continue processing
				return next();
			}
		});
};


function authenticate(plainText, salt, userPassWord) {
  return encryptPassword(plainText, salt) === userPassWord;
};

function encryptPassword(password, salt) {
  if (!password || !salt) return '';
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

exports.register = function(router) {
  router.post('/login', Auth.login);
}
