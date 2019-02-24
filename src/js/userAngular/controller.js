(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'currencyService', 'commissions', function currencyController($scope, currencyService, commissions) {
    $scope.currencies = [];
    $scope.commissions = commissions;

    $scope.currencyToSell = null;
    $scope.currencyToBuy = null;
    $scope.commission = null;

    $scope.crossPrice = null;

    $scope.value = 0;

    $scope.swapCurrencies = () => {
      [$scope.currencyToSell, $scope.currencyToBuy] = [$scope.currencyToBuy, $scope.currencyToSell];
    };

    $scope.disableAnotherInput = () => {
    };

    currencyService.updatePrices().then((response) => {
      $scope.currencies = response.data;
    });

    // console.log($scope.currencies)
  }]);
})();
