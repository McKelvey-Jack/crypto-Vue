<template>
  <div class="coin-page">
    <h1 class="header">{{ id }} Price History</h1>
    <div class="chart">
      <area-chart prefix="£" width="100%" :data="prices"></area-chart>
    </div>
    <div class="filter-buttons">
      <button v-on:click="filterTimeData('7')">1 week</button>
      <button v-on:click="filterTimeData('30')">1 Month</button>
      <button v-on:click="filterTimeData('182')">6 Months</button>
      <button v-on:click="filterTimeData('365')">1 Year</button>
      <button v-on:click="filterTimeData('1200')">3 Years</button>
    </div>
    <router-link class="back-link" to="/">Back To All Coins</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Coin',
  props: 'currentPrice',
  data() {
    return {
      prices: {},
      id: this.$route.params.coin,
      noOfDays: 7,
      interval: 'daily',
    };
  },

  created() {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${this.id}/market_chart?vs_currency=gbp&days=${this.noOfDays}&interval${this.interval}?
        `
      )
      .then((res) => {
        this.prices = this.filterPriceData(res.data.prices);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    filterPriceData(prices) {
      const priceData = {};

      prices.forEach((price) => {
        const date = new Date(price[0]).toLocaleDateString('en-US');
        priceData[date] = price[1];
      });
      console.log(priceData);

      return priceData;
    },
    filterTimeData(filter, interval) {
      console.log('here', filter);
      this.noOfDays = filter;

      if (interval) {
        this.interval = interval;
      }

      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${this.id}/market_chart?vs_currency=gbp&days=${this.noOfDays}&interval${this.interval}?
        `
        )
        .then((res) => {
          this.prices = this.filterPriceData(res.data.prices);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.coin-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  text-transform: capitalize;
}
.chart {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5em;
}

.filter-buttons {
  display: flex;
  margin-top: 1em;
  border: 1.5px solid lightgray;
  border-radius: 6px;
}

.filter-buttons button {
  margin: 0.3em, 0.1em;
  border-radius: 4px;
  font-size: 1.2em;
  color: #2c3e50;
  margin: 0.2em;
  background: none;
  border: none;
}

@media screen and (max-width: 500px) {
  .filter-buttons button {
    font-size: 0.7em;
  }
  .chart {
    margin-top: 1em;
  }
}

.filter-buttons button:hover {
  cursor: pointer;
  background: lightgray;
}

.filter-buttons button:focus {
  outline: none;
}

.back-link {
  background: none;
  text-decoration: none;
  color: #2c3e50;
  margin-top: 1em;
}
</style>
