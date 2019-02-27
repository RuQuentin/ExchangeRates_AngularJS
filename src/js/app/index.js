/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp', []);

  currencyConverterApp
    .config(['currencyServiceProvider', function (currencyServiceProvider) {
      currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }])

    .run(['$window', '$rootScope', function ($window, $rootScope) {
      $rootScope.internetAvailability = navigator.onLine;

      $window.addEventListener('offline', () => {
        $rootScope.$apply(() => {
          $rootScope.internetAvailability = false;
        });
      }, false);

      $window.addEventListener('online', () => {
        $rootScope.$apply(() => {
          $rootScope.internetAvailability = true;
        });
      }, false);
    }]);
}());
