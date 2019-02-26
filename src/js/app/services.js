/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */
(() => {
  const currencyConverterApp = angular.module('currencyConverterApp');

  currencyConverterApp.value('commissions', {
    '0%': 0,
    '1%': 1,
    '2%': 2,
    '3%': 3,
    '4%': 4,
    '5%': 5,
  });


  currencyConverterApp.value('urlPrivate', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');


  currencyConverterApp.value('currencies', {
    UAH: {
      ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1,
    },
  });


  currencyConverterApp.value('deal', {
    ccyToExchange: {
      name: null,
      sum: null,
    },
    ccyToReceipt: {
      name: null,
      sum: null,
    },
    crossRate: 1,
    commission: 0,
    active: null,
  });


  currencyConverterApp.service('currencyService', ['$http', 'urlPrivate', 'currencies', 'deal', function ($http, urlPrivate, currencies, deal) {
    this.updatePrices = () => {
      $http({
        method: 'GET',
        url: urlPrivate,
      })
        .then((response) => {
          response.data.forEach((item) => {
            currencies[item.ccy] = item;
          });
        });
    };


    this.calcRate = () => {
      let ccyToSell = deal.ccyToExchange.name;
      let ccyToBuy = deal.ccyToReceipt.name;
      deal.crossRate = 1;

      const convertTowards = () => {
        deal.crossRate = deal.crossRate * +currencies[ccyToSell].buy / +currencies[ccyToBuy].sale;
      };

      if (!ccyToSell || !ccyToBuy) return;

      if (currencies[ccyToSell].base_ccy === ccyToBuy) {
        deal.crossRate = +currencies[ccyToSell].buy;
        return;
      }

      convertTowards();

      ccyToSell = currencies[ccyToSell].base_ccy;
      ccyToBuy = currencies[ccyToBuy].base_ccy;

      if (ccyToSell !== ccyToBuy) convertTowards();
    };


    this.swapCurrencies = () => {
      [deal.ccyToExchange, deal.ccyToReceipt] = [deal.ccyToReceipt, deal.ccyToExchange];
    };


    this.setActiveCurrency = (currency) => {
      deal.active = currency;
    };


    this.updateSums = () => {
      if (deal.active === deal.ccyToExchange) {
        deal.ccyToReceipt.sum = deal.ccyToExchange.sum * deal.crossRate * (1 - deal.commission / 100);
        deal.ccyToReceipt.sum = +deal.ccyToReceipt.sum.toFixed(2);
      } else {
        deal.ccyToExchange.sum = deal.ccyToReceipt.sum / deal.crossRate / (1 - deal.commission / 100);
        deal.ccyToExchange.sum = +deal.ccyToExchange.sum.toFixed(2);
      }
    };
  }]);
})();
