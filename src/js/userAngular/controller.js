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

      while (true) {
        $scope.crossPrice = $scope.crossPrice * +ccyToSell.buy / ccyToBuy.sale;

        if (ccyToSell.base_ccy === ccyToBuy.base_ccy) return;

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
    };

    $scope.calcSumToPay = () => {
      $scope.sumToPay = $scope.sumToReceive / $scope.crossPrice / (1 - $scope.commission / 100);
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

    // $scope.disableAnotherInput = () => {
    // };

    // $scope.print = () => {
    //   console.log($scope.currencies);
    //   // console.log(+$scope.currencyToBuy.sale);
    // }

    currencyService.updatePrices().then((response) => {
      $scope.currencies = response.data;
      $scope.currencies.push(currencyUAH);
    });
  }]);
})();
