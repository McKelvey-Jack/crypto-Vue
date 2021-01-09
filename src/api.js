import axios from 'axios';

export const getCoinList = () => {
  return axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getChartData = (id, noOfDays, interval) => {
  console.log('here');
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=${noOfDays}&interval${interval}?
    `
    )
    .then((res) => {
      return res.data.prices;
    })
    .catch((err) => {
      console.log(err);
    });
};
