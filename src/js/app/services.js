/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.value('commissions', [0, 1, 2, 3, 4, 5]);

  currencyConverterApp.value('urlPrivate', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

  currencyConverterApp.value('currencies', [{
    ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1,
  }]);

  currencyConverterApp.value('deal', [{
    ccyToExchange: {
      name: null,
      sum: null,
    },
    ccyToReceipt: {
      name: null,
      sum: null,
    },
    crossRate: null,
  }]);

  currencyConverterApp.service('currencyService', ['$http', 'urlPrivate', 'currencies', 'deal', function ($http, urlPrivate, currencies, deal) {
    this.updatePrices = () => {
      $http({
        method: 'GET',
        url: urlPrivate,
      })
        .then((response) => {
          currencies.push(...response.data);
        });
    };


    this.calcRate = () => {
      // eslint-disable-next-line prefer-const
      let ccyToSell = deal.ccyToExchange.name;
      // eslint-disable-next-line prefer-const
      let ccyToBuy = deal.ToReceipt.name;

      if (!ccyToSell || !ccyToBuy) return;

      if (currencies[ccyToSell].base_ccy === ccyToBuy) {
        deal.crossRate = +currencies[ccyToSell].buy;
        // return;
      }

      // if (currencies[ccyToSell].base_ccy)


      // let ccyToSell = currencyToSell;
      // let ccyToBuy = currencyToBuy;

      // let crossPrice = 1;

      // if (!ccyToSell || !ccyToBuy) return crossPrice;

      // if (ccyToSell.base_ccy === ccyToBuy.ccy) {
      //   crossPrice = +ccyToSell.buy;
      //   return crossPrice;
      // }

      // while (ccyToSell.ccy !== ccyToBuy.ccy) {
      //   crossPrice = crossPrice * +ccyToSell.buy / ccyToBuy.sale;

      //   // eslint-disable-next-line no-loop-func
      //   ccyToSell = currencies.find(item => item.ccy === ccyToSell.base_ccy);
      //   // eslint-disable-next-line no-loop-func
      //   ccyToBuy = currencies.find(item => item.ccy === ccyToBuy.base_ccy);
      // }

      // return crossPrice;
    };


    // this.updateSums = () => {
    //   if ($scope.currencyActive === $scope.currencyToSell) {
    //     $scope.sumToReceive = $scope.sumToPay * $scope.crossPrice * (1 - $scope.commission / 100);
    //     $scope.sumToReceive = +$scope.sumToReceive.toFixed(2);
    //   } else {
    //     $scope.sumToPay = $scope.sumToReceive / $scope.crossPrice / (1 - $scope.commission / 100);
    //     $scope.sumToPay = +$scope.sumToPay.toFixed(2);
    //   }
    // };
  }]);
})();
