/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable implicit-arrow-linebreak */
(function () {
  const currencyConverterApp = angular.module('currencyConverterApp');
  currencyConverterApp.value('commissions', {
    '0%': 0,
    '1%': 1,
    '2%': 2,
    '3%': 3,
    '4%': 4,
    '5%': 5,
  });


  // currencyConverterApp.value('urlPrivate', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');


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


  currencyConverterApp.provider('currencyService', function () {
    // eslint-disable-next-line no-unused-vars
    let API = '';

    this.setAPI = (apiUrl) => {
      API = apiUrl;
    };

    this.$get = ['$http', 'currencies', 'deal', function ($http, currencies, deal) {
      return {
        updatePrices: () => {
          $http({
            method: 'GET',
            url: API,
          })
            .then((response) => {
              response.data.forEach((item) => {
                currencies[item.ccy] = item;
              });
            });
        },


        calcRate: () => {
          let ccyToSell = deal.ccyToExchange.name;
          let ccyToBuy = deal.ccyToReceipt.name;
          deal.crossRate = 1;

          const convertTowards = () => {
            // eslint-disable-next-line max-len
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
        },


        swapCurrencies: () => {
          [deal.ccyToExchange, deal.ccyToReceipt] = [deal.ccyToReceipt, deal.ccyToExchange];
        },


        setActiveCurrency: (currency) => {
          deal.active = currency;
        },


        updateSums: () => {
          const { ccyToReceipt, ccyToExchange } = deal;

          if (deal.active === deal.ccyToExchange) {
            ccyToReceipt.sum = ccyToExchange.sum * deal.crossRate * (1 - deal.commission / 100);
            ccyToReceipt.sum = +ccyToReceipt.sum.toFixed(2);
          } else {
            ccyToExchange.sum = ccyToReceipt.sum / deal.crossRate / (1 - deal.commission / 100);
            ccyToExchange.sum = +ccyToExchange.sum.toFixed(2);
          }
        },
      };
    }];
  });
}());
