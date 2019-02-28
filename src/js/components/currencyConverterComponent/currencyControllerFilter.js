/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.filter('filterCurrencies', () =>
    (currencies, usedCurrency) => {
      const filteredCurrencies = Object.assign({}, currencies);
      delete filteredCurrencies[usedCurrency];
      return filteredCurrencies;
    });
})();
