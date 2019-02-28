/* eslint-disable func-names */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'commissions', 'currencies', 'currencyService', 'deal', function ($scope, commissions, currencies, currencyService, deal) {
    $scope.currencies = currencies;
    $scope.commissions = commissions;
    $scope.deal = deal;
    $scope.swapCurrencies = currencyService.swapCurrencies;
    $scope.setActiveCurrency = currencyService.setActiveCurrency;

    // currencyService.updatePrices();


    $scope.$watchGroup([
      () => deal.ccyToExchange.name,
      () => deal.ccyToReceipt.name,
    ],
    () => {
      currencyService.calcRate();
      currencyService.updateSums();
    });

    $scope.$watchGroup([
      () => deal.ccyToExchange.sum,
      () => deal.ccyToReceipt.sum,
      () => deal.commission,
    ],
    currencyService.updateSums);
  }]);
}());
