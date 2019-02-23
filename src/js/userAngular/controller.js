(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', function currencyController($scope) {
    $scope.currencies = [
      { name: 'USD', sellPrice: null, buyPrice: null },
      { name: 'RUB', sellPrice: null, buyPrice: null },
      { name: 'UAH', sellPrice: null, buyPrice: null },
      { name: 'EUR', sellPrice: null, buyPrice: null },
    ];

    $scope.commissions = [0, 1, 2, 3, 4, 5];

    $scope.currencyToSell = {};
    $scope.currencyToBuy = {};
    $scope.commission = null;

    $scope.crossPrice = null;

    $scope.value = '0.00000';

    $scope.rotateCurrencies = () => {
      [$scope.currencyToSell, $scope.currencyToBuy] = [$scope.currencyToBuy, $scope.currencyToSell];
    };

    // console.log($scope)
  }]);
})();
