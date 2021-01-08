<template>
  <div class="coin-container">
    <div class="search-container">
      <input
        class="search-input"
        type="text"
        v-model="search"
        placeholder="Search Crypto"
      />

      <p></p>
    </div>
    <ul class="coin-list">
      <li v-for="coin in filteredCoins" :key="coin.id">
        <router-link
          :to="`${coin.id}`"
          style="text-decoration:none; color: inherit;"
        >
          <div class="coin">
            <p>{{ coin.market_cap_rank }}</p>
            <img :src="coin.image" class="coin-image" />
            <p>{{ coin.id }}</p>
            <p>
              <strong>£{{ coin.current_price.toFixed(2) }}</strong>
            </p>
            <p
              class="lessThan0"
              v-bind:class="{ greaterThan0: coin.greaterThan0 }"
            >
              {{ coin.price_change_percentage_24h.toFixed(2) }}%
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CoinsList',
  data() {
    return {
      coins: [],
      search: '',
    };
  },
  methods: {
    formattCoinData(coins) {
      coins.map((coin) => {
        if (coin.price_change_percentage_24h === null) {
          coin.price_change_percentage_24h = 0;
        }
        if (coin.price_change_percentage_24h > 0) {
          coin.greaterThan0 = true;
        } else {
          coin.greaterThan0 = false;
        }
      });
      return coins;
    },
  },
  created() {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp')
      .then((res) => {
        this.coins = this.formattCoinData(res.data);
        console.log(this.coins);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    filteredCoins() {
      return this.coins.filter((coin) => {
        return coin.id.includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.coin-container {
}
.coin-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.coin-list li {
  width: 80%;
}

.coin {
  display: flex;
  flex-direction: row;
  margin: 10px;
  border: 1px solid black;
  border-radius: 6px;
}

.coin:hover {
  background: lightslategray;
  transition: 0.5s ease;
  cursor: pointer;
}

.coin p {
  margin: 30px;
  font-size: 1.5em;
}
.coin-image {
  width: 4em;
  height: 4em;
  margin-top: 1em;
}

.lessThan0 {
  color: red;
}

.greaterThan0 {
  color: green;
}

.search-input {
  font-size: 1.3em;
  text-align: center;
  border-radius: 4px;
  border: 1px solid black;
}

.search-input:focus {
  outline: none;
}
</style>
