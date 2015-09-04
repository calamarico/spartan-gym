angular.module('spartaApp')
.directive('setsPanel', function() {
  return {
    templateUrl: 'templates/sets-panel.tmpl.html',
    controller: 'setsController',
    replace: true,
    restrict: 'A'
  };
})
.directive('mainSection', function() {
  return {
    templateUrl: 'templates/main-section.tmpl.html',
    controller: 'mainController',
    replace: true,
    restrict: 'A'
  };
})
.directive('deckSection', function() {
  return {
    templateUrl: 'templates/deck-section.tmpl.html',
    controller: 'deckController',
    replace: true,
    restrict: 'A'
  };
})
.directive('card', function() {
  return {
    restrict: 'A',
    replace: true,
    /**
     * Scope:
     *  - card {number}: card id.
     */
    scope: {
      card: '=card',
      hiRes: '=?'
    },
    templateUrl: 'templates/card.tmpl.html',
    link: function(scope, element, attributes) {
      var id = scope.card;
      scope.src = (scope.hiRes ?
        'http://api.mtgdb.info/content/hi_res_card_images/{id}.jpg' :
        'http://api.mtgdb.info/content/card_images/{id}.jpeg')
        .replace('{id}', id);
    }
  };
})
.directive('navbar', function() {
  return {
    templateUrl: 'templates/navbar.tmpl.html',
    controller: 'navbarController',
    replace: true,
    restrict: 'A'
  };
});
