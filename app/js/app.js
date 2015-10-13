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
.run(['$rootScope', '$modal', '$timeout', 'spartaDB', '$window',
  function($rootScope, $modal, $timeout, spartaDB, $window) {
    $rootScope.customers = [];
    $rootScope.maxUsersShowed = 15;
    $rootScope.todayDate = new Date();
    $rootScope.todayDate.setHours(0);
    $rootScope.todayDate.setMinutes(0);
    $rootScope.todayDate.setSeconds(0);
    $rootScope.showForm = false;
    $rootScope.newCustomer = {};
    $rootScope.search = '';
    $rootScope.isNewPayment = false;
    $rootScope.newPayment = {
      paymentType: 'cash'
    };

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

    function _getNewPaymentId() {
      return $rootScope.customerSelected.payment[
        $rootScope.customerSelected.payment.length - 1].id + 1;
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
      var _customer;

      if (!form.$valid) {
        return;
      }

      _customer = {
        id: _getNewId(),
        name: $rootScope.newCustomer.name,
        nif: $rootScope.newCustomer.nif,
        telf: $rootScope.newCustomer.telf,
        birthdate: formatStringDate($rootScope.newCustomer.birthDate),
        startDate: $rootScope.newCustomer.startDate.getTime()
      };

      $rootScope.customers.push(_customer);
      spartaDB.addCustomer(_customer);

      form.$setPristine();
      form.$setUntouched();
      $timeout(function() {
        $rootScope.newCustomer = {};
      });
    };

    $rootScope.addNewPayment = function(form) {
      var _payment;

      if (!form.$valid) {
        return;
      }

      _payment = {
        id: _getNewPaymentId(),
        amount: $rootScope.newPayment.amount,
        paymentDate: $rootScope.newPayment.paymentDate.getTime(),
        paymentType: $rootScope.newPayment.paymentType
      };

      $rootScope.customerSelected.payment.push(_payment);
      spartaDB.setPayment($rootScope.customerSelected);

      form.$setPristine();
      form.$setUntouched();
      $timeout(function() {
        $rootScope.newPayment = {
          paymentType: 'cash'
        };
      });
    };

    $rootScope.deleteCustomer = function() {
      if ($window.confirm('¿Estás seguro de eliminar el registro?')) {
        spartaDB.deleteCustomer($rootScope.customerSelected);
        $rootScope.customers.length = 0;
        spartaDB.initDB();
        $rootScope.modalInstance.dismiss();
      }
    };

    $rootScope.deletePayment = function(payment) {
      var _payments = [];

      if ($window.confirm('Estás seguro de eliminar el pago?')) {
        for (var i = 0; i < $rootScope.customerSelected.payment.length; i++) {
          if (payment.id !== $rootScope.customerSelected.payment[i].id) {
            _payments.push($rootScope.customerSelected.payment[i]);
          }
        }
        $rootScope.customerSelected.payment = _payments;
        spartaDB.setPayment($rootScope.customerSelected);
      }
    };

    $rootScope.saveToFile = spartaDB.saveToFile;

    spartaDB.initDB();
}]);
