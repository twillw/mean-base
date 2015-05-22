var db = require('../db/dbclient'),
    should = require("should")
    UserCtrl = require('../controllers/UserCtrl');

describe("User", function() {
  // Set up before tests run
  db.initialize(config.mongo.uri, function(err) {
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
  })

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

})
