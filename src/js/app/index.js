/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp', []);

  currencyConverterApp
    .config(['currencyServiceProvider', function (currencyServiceProvider) {
      currencyServiceProvider.setAPI('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }]);
}());
