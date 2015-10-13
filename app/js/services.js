angular.module('spartaApp')
.factory('spartaDB', ['$rootScope', '$window', function($rootScope, $window) {
  var db, tx, store;

  function _getAllItems() {
    var cursorRequest = store.openCursor(),
      result = [];
 
    cursorRequest.onerror = function(error) {
        console.log(error);
    };
 
    cursorRequest.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
          $rootScope.customers.push(cursor.value);
          cursor.continue();
        } else {
          $rootScope.$digest();
        }
    };
  }

  function addPayment(item) {
    var request;

    tx = db.transaction('customers', 'readwrite');
    store = tx.objectStore('customers');
    request = store.get(item.id);

    request.onerror = function(event) {
      console.log('error:' + event);
    };
    request.onsuccess = function(event) {
      var data = request.result,
        _request;
      
      data.payment = item.payment;
      _request = store.put(data);

      _request.onerror = function(event) {
        console.log('error:' + event);
      };
    };
  }

  function addCustomer(item) {
    tx = db.transaction('customers', 'readwrite');
    store = tx.objectStore('customers');
    store.put(item);
  }

  function deleteCustomer(item) {
    tx = db.transaction('customers', 'readwrite');
    store = tx.objectStore('customers');
    store.delete(item.id);
  }

  function errorHandler(e) {
    console.log('Error: ' + e);
  }

  function saveToFile() {
    var data = 'text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify($rootScope.customers));

    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'spartaDBBtackup.txt';
    a.innerHTML = 'download JSON';
    a.click();
  }

  function initDB() {
    var request;
    request = $window.indexedDB.open('SpartaDB');

    request.onerror = function(event) {
      alert('Error al abrir la base de datos, consulte al calamar');
    };

    request.onsuccess = function(event) {
      db = request.result;
      tx = db.transaction('customers', 'readwrite');
      store = tx.objectStore('customers');
      _getAllItems();
    };

    request.onupgradeneeded = function() {
      // The database did not previously exist, so create object
      // stores and indexes.
      db = request.result;
      store = db.createObjectStore('customers', {keyPath: 'id'});
      store.createIndex('by_id', 'id', {unique: true});

      // Populate with initial data.
      store.put({
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
      });
      store.put({
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
      });
      store.put({
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
      });
    };
  }


  return {
    initDB: initDB,
    addCustomer: addCustomer,
    deleteCustomer: deleteCustomer,
    saveToFile: saveToFile,
    addPayment: addPayment
  };
}]);
