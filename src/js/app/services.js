/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.value('commissions', [0, 1, 2, 3, 4, 5]);

  currencyConverterApp.value('urlPrivate', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

  currencyConverterApp.value('currencyUAH', {
    ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1,
  });

  currencyConverterApp.service('currencyService', ['$http', 'urlPrivate', function ($http, urlPrivate) {
    this.updatePrices = () =>
      $http({
        method: 'GET',
        url: urlPrivate,
      });


    this.calcCrossPrice = (currencyToSell, currencyToBuy, currencies) => {
      let ccyToSell = currencyToSell;
      let ccyToBuy = currencyToBuy;

      let crossPrice = 1;

      if (!ccyToSell || !ccyToBuy) return crossPrice;

      if (ccyToSell.base_ccy === ccyToBuy.ccy) {
        crossPrice = +ccyToSell.buy;
        return crossPrice;
      }

      while (ccyToSell.ccy !== ccyToBuy.ccy) {
        crossPrice = crossPrice * +ccyToSell.buy / ccyToBuy.sale;

        // eslint-disable-next-line no-loop-func
        ccyToSell = currencies.find(item => item.ccy === ccyToSell.base_ccy);
        // eslint-disable-next-line no-loop-func
        ccyToBuy = currencies.find(item => item.ccy === ccyToBuy.base_ccy);
      }

      return crossPrice;
    };
  }]);
})();
