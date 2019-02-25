(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'currencyService', 'commissions', 'currencyUAH', function currencyController($scope, currencyService, commissions, currencyUAH) {
    $scope.currencies = [];
    $scope.commissions = commissions;

    $scope.currencyToSell = {};
    $scope.currencyToBuy = {};
    $scope.crossPrice = null;

    $scope.calcCrossPrice = () => {
      let ccyToSell = $scope.currencyToSell;
      let ccyToBuy = $scope.currencyToBuy;

      if (!ccyToSell || !ccyToBuy) return;

      if (ccyToSell.base_ccy === ccyToBuy.ccy) {
        $scope.crossPrice = +ccyToSell.buy;
        return;
      }

      $scope.crossPrice = 1;

      while (ccyToSell.ccy !== ccyToBuy.ccy) {
        $scope.crossPrice = $scope.crossPrice * +ccyToSell.buy / ccyToBuy.sale;

        // eslint-disable-next-line no-loop-func
        ccyToSell = $scope.currencies.find(item => item.ccy === ccyToSell.base_ccy);
        // eslint-disable-next-line no-loop-func
        ccyToBuy = $scope.currencies.find(item => item.ccy === ccyToBuy.base_ccy);
      }
    };

    $scope.setActive = (currency) => {
      $scope.currencyActive = currency;
    };

    $scope.calcSumToReceive = () => {
      $scope.sumToReceive = $scope.sumToPay * $scope.crossPrice * (1 - $scope.commission / 100);
      $scope.sumToReceive = +$scope.sumToReceive.toFixed(2);
    };

    $scope.calcSumToPay = () => {
      $scope.sumToPay = $scope.sumToReceive / $scope.crossPrice / (1 - $scope.commission / 100);
      $scope.sumToPay = +$scope.sumToPay.toFixed(2);
    };

    $scope.calcSums = () => {
      if ($scope.currencyActive === $scope.currencyToSell) {
        $scope.calcSumToReceive();
      } else {
        $scope.calcSumToPay();
      }
    };

    $scope.swapCurrencies = () => {
      [$scope.currencyToSell, $scope.currencyToBuy] = [$scope.currencyToBuy, $scope.currencyToSell];
    };

    $scope.clearSums = () => {
      $scope.sumToReceive = null;
      $scope.sumToPay = null;
    };

    currencyService.updatePrices().then((response) => {
      $scope.currencies = response.data;
      $scope.currencies.push(currencyUAH);
    });
  }]);
})();
