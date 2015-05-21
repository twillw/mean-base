'use strict';

var dateTime = {

  newDateFromObject: function(opts) {
    var date = new Date(opts.year, opts.month, opts.date, opts.hour, opts.minutes);
    date.setUTCHours(opts.hour);
    return date;
  },

  buildDateObject: function (date) {
    date = new Date(date);
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
        hour: date.getUTCHours(),
        minutes: date.getUTCMinutes()
      }
  },

  getFirstOfMonth: function(date) {
    var obj = this.buildDateObject(date);
    obj.date = 1;
    obj.hour = 0;
    return this.newDateFromObject(obj);
  },

  getLastOfMonth: function(date) {
    var obj = this.buildDateObject(date);
    obj.date = 28;
    obj.hour = 23;
    obj.minutes = 59;
    var newDate = this.newDateFromObject(obj);
    while (obj.month === newDate.getMonth()) {
      newDate = new Date(Date.parse(newDate) + (24*3600*1000));
    }
    return new Date(Date.parse(newDate) - (24*3600*1000));
  },

  endOfDay: function(date) {
    date = this.buildDateObject(date);
    date.hour = 23;
    date.minutes = 59;
    return this.newDateFromObject(date);
  },

  startOfDay: function(date) {
    date = this.buildDateObject(new Date(date));
    date.hour = 0;
    date.minutes = 0;
    return this.newDateFromObject(date);
  },

  convertToUTC: function(date) {
    date = new Date(date);
    var hrs = date.getHours();
    date.setUTCHours(hrs);
    return date;
  },

  formatISOString: function(date) {
    var UTCString = new Date(date).toUTCString().split(' ');
    console.log(UTCString);
    var fullDateArr = date.split('T');
    var dateArr = fullDateArr[0].split('-');
    var time = fullDateArr[1];
    var timeArr = time.split(':');
    var hrs = parseInt(timeArr[0]);
    var timeInDay = hrs < 12 ? ' AM' : ' PM'; 
    hrs = hrs <= 12 ? hrs : hrs - 12;
    var shortTime = hrs + ':' + timeArr[1] + timeInDay;
    var mediumDate = UTCString[2] + ' ' + UTCString[1] + ', ' + UTCString[3];
    return mediumDate + ' ' + shortTime;
  }
}

module.exports = dateTime;
