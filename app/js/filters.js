/* filters.js */
angular.module('spartaApp')
.filter('searchFilter', [function() {
  return function(items, text) {
    return items.filter(function(item) {
      return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
  };
}]);

