define(
  [
    'app'
  ], 
  function (app) {
    'use strict';

    app.filter('aqCapitalize', function() {
      return function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    })
    .filter('aqTruncate', function() {
      return function(str, index) {
        return str.slice(0, index);
      };
    })
    .filter('aqEllipsis', function() {
      return function(str, index, end) {
        end = "...";
        return str.slice(0, index) + end;
      };
    })
    .filter('aqDate', function() {
      return function(date, formatType) {
        var UTCString = new Date(date).toUTCString().split(' ');
        var fullDateArr = date.split('T');
        var dateArr = fullDateArr[0].split('-');
        var time = fullDateArr[1];
        var timeArr = time.split(':');
        var hrs = parseInt(timeArr[0]);
        var timeInDay = hrs < 12 ? ' AM' : ' PM'; 
        hrs = hrs <= 12 ? hrs : hrs - 12;
        var shortTime = hrs + ':' + timeArr[1] + timeInDay;
        var mediumDate = UTCString[2] + ' ' + UTCString[1] + ', ' + UTCString[3];
        switch (formatType) {
          case 'shortTime':
            return shortTime;
            break;
          case 'mediumDate':
            return mediumDate;
            break;
          case 'short':
            return dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0].slice(2) + ' ' + shortTime;
            break;
          case 'medium':
            return mediumDate + ' ' + shortTime;
            break;
        }
      };
    })

  // You need to return something from this factory function
  return app;

}); 
