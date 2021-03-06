/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp', ['ui.router']);

  currencyConverterApp
    .config(['currencyServiceProvider', '$stateProvider', function (currencyServiceProvider, $stateProvider) {
      currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

      $stateProvider
        .state({
          name: 'currency-converter',
          url: '/currency-converter',
          templateUrl: '/components/currencyConverterComponent/currencyConverterTemplate.html',
          controller: 'currencyController',
          resolve: {
            resolvedValue: currencyService => currencyService.updatePrices(),
          },
        })
        .state({
          name: 'another',
          url: '/another',
          component: 'another',
        })
        .state({
          name: 'abc',
          url: '/abc',
          template: '<p>abc</p>',
        });
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
