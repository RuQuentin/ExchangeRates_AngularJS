/* eslint-disable func-names */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.component('currencyConverter', {
    templateUrl: '/components/currencyConverterComponent/currencyConverterTemplate.html',
    controller: 'currencyController',
  });
}());
