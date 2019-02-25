/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.service('currencyService', ['$http', 'urlPrivate', function currencyService($http, urlPrivate) {
    this.updatePrices = () =>
      $http({
        method: 'GET',
        url: urlPrivate,
      });
  }]);

  currencyConverterApp.value('commissions', [0, 1, 2, 3, 4, 5]);

  currencyConverterApp.value('urlPrivate', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

  currencyConverterApp.value('currencyUAH', {
    ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1,
  });
})();
