// imports
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


// constants
exports.OPTIONS_UPDATE_AND_CHECK = {
    returnOriginal: false
};
exports.OPTIONS_UPSERT = {
    returnOriginal: false,
    upsert: true
};


// public variables
exports.User = null;
exports.Base = null;

// private variables
var _db = null;

// public methods
exports.initialize = function(dbUri, callback) {
  // open connection using native driver
  console.log('connecting to db');
  console.log(dbUri);
  MongoClient.connect(dbUri, function(e, db) {
    // assert connection was successful
    assert.equal(null, e);

    // keep instance of db
    _db = db;

    console.log("connected to db");

    var collectionErrors = 0;

    // bind to collections
    createCollections(db,
      [{
        name: 'user',
        callback: function(collection) {
          exports.User = collection;
          // Create indices here
        }
      }], callback);
  });
};


// private methods
function createCollections(db, items, callback) {
  // create counter
  var collectionsPending = items.length;

  // create collections
  var collectionErrors = 0;

  for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    db.collection(item.name, function (e, c) {

      // track errors
      if (e) {
        ++collectionErrors;
      } else {
        item.callback(c);
      }

      // decrement counter
      collectionsPending--;

      // invoke primary callback if we are done
      if (collectionsPending == 0) {
        // create error if required
        var error;
        if (collectionErrors > 0) {
          error = new Error('One or more collections failed to be created');
          error.httpCode = 500;
        }
        console.log("SHOULD CALL CALLBACK");

        // invoke callback
        callback(error);
      }
    });
  }
}

