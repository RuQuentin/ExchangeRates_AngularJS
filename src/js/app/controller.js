/* eslint-disable func-names */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'commissions', 'currencyUAH', 'currencyService', function ($scope, commissions, currencyUAH, currencyService) {
    $scope.currencies = [];
    $scope.currencyToSell = {};
    $scope.currencyToBuy = {};
    $scope.crossPrice = null;

    $scope.commissions = commissions;

    currencyService.updatePrices().then((response) => {
      $scope.currencies = response.data;
      $scope.currencies.push(currencyUAH);
    });

    $scope.calcCrossPrice = () => {
      // eslint-disable-next-line max-len
      $scope.crossPrice = currencyService.calcCrossPrice($scope.currencyToSell, $scope.currencyToBuy, $scope.currencies);
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
  }]);
})();
