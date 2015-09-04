/**
 * Sets controller.
 */
angular.module('spartaApp')
.controller('setsController', ['$scope', '$rootScope', 'mtgdbApi',
  function($scope, $rootScope, mtgdb) {
    var _sets = [];
    /**
     * Sets scope.sets object from mtgdbApi.
     */
    function setSetsInfo() {
      var i, _date, _fullYear;

      /**
       * Finds year inside set element.
       * @param {Object} element set object.
       * @param {index} index index.
       */
      function findYear(element, index) {
        return element.fullYear === _fullYear;
      }

      mtgdb.getAllSets().then(function(response) {
        var _set;
        for (i = 0; i < response.data.length; i++) {
          _date = new Date(response.data[i].releasedAt);
          _fullYear = _date.getFullYear();
          _set = _sets.find(findYear);

          if (angular.isUndefined(_set)) {
            _set = {
              fullYear: _fullYear,
              sets: [response.data[i]]
            };
            _sets.push(angular.copy(_set));
          } else {
            _set.sets.push(response.data[i]);
          }
        }
        $scope.sets = _sets.reverse();
      }, function(error) {
        // TODO: error control
      });
    }

    $scope.sets = null;

    /**
     * Sets selected set in sets section.
     * @param {number} index index selected.
     */
    $scope.setSelectedSet = function(index) {
      if ($scope.sets[index].isSelected) {
        $scope.sets[index].isSelected = false;
      } else {
        $scope.sets[index].isSelected = true;
      }
    };

    /**
     * Sets main selected set showed in main section.
     * @param {Object} event click event object.
     * @param {Object} item set selected object.
     */
    $scope.setMainSelectedSet = function(event, item) {
      event.stopPropagation();

      $rootScope.mainSet = item;
    };

    setSetsInfo();
  }
])
.controller('mainController', ['$scope', '$modal', '$rootScope',
  function($scope, $modal, $rootScope) {
    var modalInstance;

    /**
     * Executes after changes occurs in card checkboxes.
     * @param {number} item card id.
     */
    $scope.statusCheckedChange = function(item) {
      if (!$rootScope.newDeckItems[item]) {
        delete $rootScope.newDeckItems[item];
      }
    };

    /**
     * Opens modal window with card detail.
     * @param {Object} card card object.
     */
    $scope.openModal = function(card) {
      $rootScope.selectedCard = card;
      modalInstance = $modal.open({
        templateUrl: 'templates/detailsModal.tmpl.html',
        size: 'sm'
      });
    };
  }
])
.controller('navbarController', ['$scope', '$location',
  function($scope, $location) {
    var routes = {
      seeker: '/seeker',
      deck: '/deck'
    };

    $scope.swapViews = function() {
      switch ($location.path()) {
        case routes.seeker:
          $location.path(routes.deck);
          break;
        case routes.deck:
          $location.path(routes.seeker);
          break;
      }
    };
  }
])
.controller('deckController', ['$scope',
  function($scope) {
    
  }
]);
