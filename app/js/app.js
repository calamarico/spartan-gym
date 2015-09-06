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
      'birthdate': '18/07/1983',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 2,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': '31/09/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 3,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 4,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 5,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': '31/09/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 6,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 7,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 8,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 9,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': '31/09/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 10,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 11,
      'name': 'Daniel Hernandez Zafra',
      'birthdate': '18/07/1983',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 12,
      'name': 'Beatriz Sanfrutos',
      'birthdate': '29/09/1981',
      'payment': [
        {
          'id': 1,
          'paymentDate': '31/09/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 13,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
          'amount': 30
        }
      ]
    },
    {
      'id': 14,
      'name': 'Eustaquio Anselmo Martínez',
      'birthdate': '07/01/1985',
      'payment': [
        {
          'id': 1,
          'paymentDate': '30/09/2015',
          'amount': 30
        },
        {
          'id': 2,
          'paymentDate': '30/10/2015',
          'amount': 30
        },
        {
          'id': 3,
          'paymentDate': '30/11/2015',
          'amount': 30
        },
        {
          'id': 4,
          'paymentDate': '30/12/2015',
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

    $rootScope.openModal = function(customer) {
      $rootScope.customerSelected = customer;
      $rootScope.modalInstance = $modal.open({
        templateUrl: 'templates/detailsModal.tmpl.html'
        //size: 'sm'
      });
    };
}]);
