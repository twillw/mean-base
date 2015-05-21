var mongoose = require("mongoose"),
    BookingModel = require("../models/Booking"),
    ObjectId = require('mongoose').Types.ObjectId,
    should = require("should");

describe("Bookings", function() {
  mongoose.connect('mongodb://localhost/aquamobile_test');
  mongoose.connection.on('error', function() {});
  this.timeout(10000);
  var currentBooking = null;
  var startTime = new Date(2015, 1, 9, 10, 30);
  var mockBooking = {
    start: startTime,
    lesson_length: 60*60*1000,
    instructor_id: ObjectId('000000018d12299bb60e1eb5'),
    customer_id: ObjectId(2),
    program_id: ObjectId(3)
  }

  before(function(done) {
    BookingModel.create(mockBooking, function(err, result) {
      currentBooking = result;
      done();
    });
  });

  after(function(done) {
    BookingModel.find({}).remove(function(err) {
      //mongoose.connection.close();
      done();
    });
  });

  it("should find booking by instructor_id", function(done) {
    BookingModel.findOne({instructor_id: currentBooking.instructor_id}, function(err, result) {
        should.not.exist(err);
        should.exist(result);
        result._id.toString().should.equal(currentBooking._id.toString());
        done();
      })
  })

  it("creates a new booking with an end time", function(done) {
    var newTime = new Date(2015, 1, 10, 10, 30);
    BookingModel.create({
      start: newTime,
      lesson_length: 60*60*1000,
      instructor_id: ObjectId(1),
      customer_id: ObjectId(2),
      program_id: ObjectId(1)
    }, function(err, result) {
      var endTime = new Date(Date.parse(newTime) + 60*60*1000);
      result.end.toString().should.equal(endTime.toString());
      result.start.should.equal(newTime);
      done();
    })
  })

  it("should throw an error for booking start time overlap conflict", function(done) {
    BookingModel.create({
      start: currentBooking.start,
      lesson_length: 60*60*1000,
      instructor_id: ObjectId('000000018d12299bb60e1eb5'),
      customer_id: ObjectId(3),
      program_id: ObjectId(1),
    }, function(err, result) {
      should.exist(err);
      should.not.exist(result);
      done();
    })
  })

  it("should throw an error for booking end time overlap conflict", function(done) {
    var newStartTime = new Date(Date.parse(currentBooking.start) - 30*30*1000);
    BookingModel.create({
      start: newStartTime,
      lesson_length: 60*60*1000,
      instructor_id: ObjectId('000000018d12299bb60e1eb5'),
      customer_id: ObjectId(3),
      program_id: ObjectId(1),
    }, function(err, result) {
      should.exist(err);
      should.not.exist(result);
      done();
    })
  })

  it("should throw an error for booking time surround conflict", function(done) {
    var newStartTime = new Date(Date.parse(currentBooking.start) - 30*30*1000);
    BookingModel.create({
      start: newStartTime,
      lesson_length: 120*60*1000,
      instructor_id: ObjectId('000000018d12299bb60e1eb5'),
      customer_id: ObjectId(3),
      program_id: ObjectId(1),
    }, function(err, result) {
      should.exist(err);
      should.not.exist(result);
      done();
    })
  })

  it("should update booking with new data", function(done) {
    var newStartTime = new Date(Date.parse(currentBooking.start) + 90*30*1000);
    BookingModel.findById(currentBooking._id, function(err, result) {
      should.not.exist(err);
      result.start = newStartTime;
      result.save(function(err, updated) {
        should.not.exist(err);
        should.exist(updated);
        updated.start.toString().should.equal(newStartTime.toString());
        done();
      })
    })
  })

})
