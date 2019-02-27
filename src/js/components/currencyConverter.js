/* eslint-disable func-names */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.component('currencyConverter', {
    templateUrl: '/templates/currencyConverter.html',
    controller: 'currencyController',
  });
}());
