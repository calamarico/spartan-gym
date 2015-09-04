angular.module('spartaApp')
/**
 * MTGDB Api service.
 */
.factory('mtgdbApi', ['$http', function($http) {

  var host = 'http://api.mtgdb.info/',
    routes = {
      cards: 'cards/',
      sets: 'sets/'
    };

  /**
   * Gets all cards.
   *
   * @return {Object} Promise.
   */
  var getAllCards = function() {
    return $http.get(host + routes.cards);
  };

  /**
   * Gets card by id or name.
   * How to use:
   *    - By name: getCard('Basalt Monolith');
   *    - By id: getCard(2);
   *    - By multiple id's: getCard([1,2,3]);
   *
   * @param {Array|string} value value or values to get.
   * @return {Object} Promise.
   */
  var getCard = function(value) {
    return $http.get(host + routes.cards + ((value.isArray && value.isArray()) ?
      value.toString() : value));
  };

  /**
   * Gets all sets.
   *
   * @return {Object} Promise.
   */
  var getAllSets = function() {
    return $http.get(host + routes.sets);
  };

  /**
   * Gets set by id or array of id's.
   *
   * @param {Array|string} value value or values to get.
   * @return {Object} Promise.
   */
  var getSet = function(value) {
    return $http.get(host + routes.sets + ((value.length) ?
      value.toString() : value));
  };

  /**
   * Gets cards inside a set. You may get only a few fields
   * How to use:
   *    - getSetCards('LEA');
   *    - getSetCards('LEA', ['name', 'description']);
   *
   * @param {string} id Id of set.
   * @param {Array|string} fields Set of fields to return object.
   * @return {Object} Promise.
   */
  var getSetCards = function(id, fields) {
    return $http.get(host + routes.sets + id + '/' + routes.cards,
      (typeof fields !== 'undefined') ?
        {
          params: {
            fields: (fields.length) ? fields.toString() : fields
          }
        } :
        undefined
    );
  };

  return {
    getAllCards: getAllCards,
    getCard: getCard,
    getAllSets: getAllSets,
    getSet: getSet
  };
}])

/**
 * Utils factory to provide some function utils.
 */
.factory('utils', [function($http) {
  // In instantiation we add find method in prototype array if is
  // not implemented yet.

  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(predicate) {
        if (this === null) {
          throw new TypeError(
            'Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          if (i in list) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
        }
        return undefined;
      }
    });
  }

  /**
   * Checks if a number is even.
   *
   * @param {number} Number to check.
   * @return {boolean} True if number is even or false if it's odd.
   */
  function isEven(num) {
    return !(num & 1);
  }

  return {
    isEven: isEven
  };
}]);
