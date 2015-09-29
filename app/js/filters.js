/* filters.js */
angular.module('spartaApp')
.filter('searchFilter', ['$window', function($window) {

  return function(text) {
    return text;
  };
}]);

