'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseSchema = new Schema({
	name: {
    first: String,
    last: String
  },
});

module.exports = mongoose.model('Base', BaseSchema);
