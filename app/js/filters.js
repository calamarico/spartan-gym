/* filters.js */
angular.module('spartaApp')
.filter('timeIso', ['$window', function($window) {

  /**
   * Adds a 0 digit before the param if it has only a digit
   * @param {number} number to be checked
   * @return {(string | number)} param value with two digits
   */
  function _checkTwoDigits(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }

  return function(time) {
    var duration = '00:00',
      hours, minutes, seconds;

    if (time >= 0) {
      hours = Math.floor(time / 3600);
      minutes = Math.floor((time / 60) % 60);
      seconds = Math.floor((time / 3600) % 60);
      duration = _checkTwoDigits(hours) + ':' + _checkTwoDigits(minutes) + ':' +
      _checkTwoDigits(seconds);
    }

    return duration;
  };
}]);

