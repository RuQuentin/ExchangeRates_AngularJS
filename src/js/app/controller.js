/* eslint-disable func-names */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'commissions', 'currencies', 'currencyService', function ($scope, commissions, currencies, currencyService) {
    $scope.currencies = currencies;
    $scope.currencyToSell = {};
    $scope.currencyToBuy = {};
    $scope.crossPrice = null;

    $scope.commissions = commissions;

    currencyService.updatePrices();

    $scope.calcCrossPrice = () => {
      $scope.crossPrice = currencyService.calcRate($scope.currencyToSell, $scope.currencyToBuy);
    };

    $scope.setActive = (currency) => {
      $scope.currencyActive = currency;
    };

    $scope.$watchGroup(['sumToPay', 'sumToReceive', 'currencyToSell', 'currencyToBuy', 'commission'], () => {
      if ($scope.currencyActive === $scope.currencyToSell) {
        $scope.sumToReceive = $scope.sumToPay * $scope.crossPrice * (1 - $scope.commission / 100);
        $scope.sumToReceive = +$scope.sumToReceive.toFixed(2);
      } else {
        $scope.sumToPay = $scope.sumToReceive / $scope.crossPrice / (1 - $scope.commission / 100);
        $scope.sumToPay = +$scope.sumToPay.toFixed(2);
      }
    });

    $scope.swapCurrencies = () => {
      [$scope.currencyToSell, $scope.currencyToBuy] = [$scope.currencyToBuy, $scope.currencyToSell];
    };

    $scope.clearSums = () => {
      $scope.sumToReceive = null;
      $scope.sumToPay = null;
    };
  }]);
})();
