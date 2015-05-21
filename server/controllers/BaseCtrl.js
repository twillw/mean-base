'use strict';

var _ = require('lodash'),
    async = require('async');
var BaseModel = require('../models/Base');

var Base = {};

/**
 * Get list of all Bases
 */
Base.index = function(req, res) {
  BaseModel.find(function(err, bases) {
  if (err) { 
    return handleError(res, err);
  }
  return res.json(200, bases);
  });
};

/**
 * Get a single base for current user
 */
Base.show = function(req, res) { 
  BaseModel.find({_id: req.params.id, _parentUserId: req.user._id}, function (err, base) {
    if (err) { 
      return handleError(res, err); 
    }

    if (!base) { 
      return res.send(404); 
    }

    return res.json(base);
  });
};

/**
 * Creates a new base in the DB
 */
Base.create = function(req, res) {
  BaseModel.create(base, function(err, base) {
    if (err) { 
      return handleError(res, err); 
    } else {
      res.send(200, base);
    }
  });
};

/**
 * Updates a base
 */
Base.update = function (req, res) {
  // Delete id for merge
  if(req.body._id) { 
    delete req.body._id; 
  }

  BaseModel.findById(req.params.id, function (err, base) {
    if(err) { 
      return handleError(res, err); 
    }

    if(!base) { 
      return res.send(404); 
    }

    // Only update if admin or user
    var updated = _.merge(base, req.body);

    updated.save(function (err) {
      if (err) { 
        return handleError(res, err); 
      }
      
      return res.json(200, base);
    });
  });
};


/**
 * Deletes a base
 * restriction: 'admin'
 */
Base.destroy = function(req, res) {
  BaseModel.findById(req.params.id, function (err, base) {
    if(err) { 
      return handleError(res, err); 
    }
    if(!base) { 
      return res.send(404); 
    }
    base.remove(function (err) {
      if (err) { 
        return handleError(res, err); 
      }
      return res.json(200, base);
    });
  });
};

// Common functions

/**
 * Handles any error messages
 */
function handleError(res, err) {
  return res.send(500, err);
};

/** 
 * Handles validation erros
 */
var validationError = function(res, err) {
  return res.json(422, err);
};

// Routes for base controller
exports.register = function(router) {
  router.get('/bases', Base.index);
  router.get('/bases/:id', Base.show);
  router.post('/bases', Base.create);
  router.put('/bases/:id', Base.update);
  router.delete('/bases/:id', Base.destroy);
}
