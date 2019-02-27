/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.directive('disablingCover', function () {
    return {
      template: '<div class="cover" ng-hide="internetAvailability">Waiting for Internet connection...</div>',
    };
  });
}());
