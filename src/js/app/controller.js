/* eslint-disable max-len */
/* eslint-disable func-names */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.controller('currencyController', ['$scope', 'commissions', 'currencies', 'currencyService', 'deal', function ($scope, commissions, currencies, currencyService, deal) {
    $scope.currencies = currencies;
    $scope.deal = deal;
    // $scope.currencyToSell = {};
    // $scope.currencyToBuy = {};
    // $scope.crossPrice = null;

    currencyService.updatePrices();


    $scope.$watchGroup([() => $scope.deal.ccyToExchange.name, () => $scope.deal.ccyToReceipt.name], () => currencyService.calcRate());

    $scope.commissions = commissions;


    // $scope.calcRate = () => {
    //   currencyService.calcRate();
    // };

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
