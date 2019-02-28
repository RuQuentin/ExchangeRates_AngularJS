/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.filter('filterCurrencies', () =>
    (currencies, usedCurrency) =>
      currencies.filter(currency => currency !== usedCurrency));
})();
