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
      'name': 'Juan Diego De Frutos Humanes',
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
      'name': 'Tomás Roncero Bonaparte',
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
      'name': 'Lady Gaga Martínez Soria',
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
      'name': 'Dora la Exploradora Fernández Pérez',
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
      'name': 'Jon Trojaola Crucelaegui',
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
      'name': 'Maria del Mar Pepino Otorrinolaringologo',
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
      'name': 'Matias Prats',
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
      'name': 'Bruce Lee',
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
      'name': 'Michael Jordan',
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
      'name': 'Juanito Valderrama',
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
      'name': 'Miguel Induráin González',
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
.run(['$rootScope', 'mockUsers', '$modal', '$timeout',
  function($rootScope, mockUsers, $modal, $timeout) {
    $rootScope.customers = mockUsers.data;
    $rootScope.limitUsers = 3;
    $rootScope.maxUsersShowed = 15;
    $rootScope.todayDate = new Date();
    $rootScope.todayDate.setHours(0);
    $rootScope.todayDate.setMinutes(0);
    $rootScope.todayDate.setSeconds(0);
    $rootScope.showForm = false;
    $rootScope.newCustomer = {};

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

    function _getNewId() {
      return $rootScope.customers[$rootScope.customers.length - 1].id + 1;
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

    $rootScope.addCustomer = function(form) {
      if (!form.$valid) {
        return;
      }

      $rootScope.customers.push({
        id: _getNewId(),
        name: $rootScope.newCustomer.name,
        birthdate: formatStringDate($rootScope.newCustomer.birthDate),
        startDate: $rootScope.newCustomer.startDate.getTime()
      });

      form.$setPristine();
      form.$setUntouched();
      $timeout(function() {
        $rootScope.newCustomer = {};
      });
    };
}]);
