/* eslint-disable max-len */
/* eslint-disable func-names */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'commissions', 'currencies', 'currencyService', 'deal', function ($scope, commissions, currencies, currencyService, deal) {
    $scope.currencies = currencies;
    $scope.currencyToSell = {};
    $scope.currencyToBuy = {};
    $scope.crossPrice = null;


    $scope.deal = deal;

    $scope.commissions = commissions;

    currencyService.updatePrices();

    $scope.calcCrossPrice = () => {
      $scope.crossPrice = currencyService.calcRate();
    };

    // $scope.setActive = (currency) => {
    //   $scope.currencyActive = currency;
    // };

    // $scope.$watchGroup(['sumToPay', 'sumToReceive', 'currencyToSell', 'currencyToBuy', 'commission'], currencyService.updateSums(sumToPay, sumToReceive, currencyToSell, currencyToBuy, commission));

    // $scope.swapCurrencies = () => {
    //   [$scope.currencyToSell, $scope.currencyToBuy] = [$scope.currencyToBuy, $scope.currencyToSell];
    // };

    // $scope.clearSums = () => {
    //   $scope.sumToReceive = null;
    //   $scope.sumToPay = null;
    // };
  }]);
})();
