/* App.js */
angular.module('spartaApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/main.tmpl.html',
      pageTitle: 'Sparta Gym'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
])
.constant('mockUsers', {
  data: [
    {
      'id': 1,
      'name': 'Daniel Hernandez Zafra',
      'startDate': 1441718986268,
      'birthdate': '18/07/1983',
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        }
      ]
    },
    {
      'id': 2,
      'name': 'Beatriz Sanfrutos',
      'startDate': 1441710886484,
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443713742644,
          'amount': 30
        }
      ]
    },
    {
      'id': 3,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    },
    {
      'id': 4,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        }
      ]
    },
    {
      'id': 5,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443713742644,
          'amount': 30
        }
      ]
    },
    {
      'id': 6,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    },
    {
      'id': 7,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    },
    {
      'id': 8,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        }
      ]
    },
    {
      'id': 9,
      'name': 'Beatriz Sanfrutos',
      'startDate': 1441643271790,
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443713742644,
          'amount': 30
        }
      ]
    },
    {
      'id': 10,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    },
    {
      'id': 11,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        }
      ]
    },
    {
      'id': 12,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443713742644,
          'amount': 30
        }
      ]
    },
    {
      'id': 13,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441643271790,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    },
    {
      'id': 14,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'startDate': 1441031496628,
      'payment': [
        {
          'id': 1,
          'paymentDate': 1443627126285,
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': 1446222942644,
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': 1448901342644,
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': 1451493342644,
          'amount': 30
        }
      ]
    }
  ]
})
.run(['$rootScope', 'mockUsers', '$modal',
  function($rootScope, mockUsers, $modal) {
    $rootScope.customers = mockUsers.data;
    $rootScope.limitUsers = 3;
    $rootScope.maxUsersShowed = 15;
    $rootScope.todayDate = new Date();
    $rootScope.todayDate.setHours(0);
    $rootScope.todayDate.setMinutes(0);
    $rootScope.todayDate.setSeconds(0);

    function formatStringDate(timestamp) {
      var _temp = new Date(timestamp);

      return _temp.getFullYear() + '/' +
          ('0' + (_temp.getMonth() + 1)).slice(-2) + '/' +
          ('0' + _temp.getDate()).slice(-2);
    }

    $rootScope.formatStringDate = formatStringDate;

    function formatHourDate(timestamp) {
      var _temp = new Date(timestamp);

      return ('0' + _temp.getHours()).slice(-2) + ':' +
          ('0' + _temp.getMinutes()).slice(-2);
    }

    $rootScope.formatFullDate = function(timestamp) {
      return formatStringDate(timestamp) + ' - ' + formatHourDate(timestamp);
    };

    $rootScope.openModal = function(customer) {
      $rootScope.customerSelected = customer;
      $rootScope.modalInstance = $modal.open({
        templateUrl: 'templates/detailsModal.tmpl.html'
        //size: 'sm'
      });
    };

    $rootScope.getStringDate = function(timestamp) {
      return (timestamp > $rootScope.todayDate) ?
        formatHourDate(timestamp) :
        formatStringDate(timestamp);
    };
}]);
