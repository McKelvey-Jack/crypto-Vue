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
    <div class="coin-list-container">
      <div class="coin-list" v-for="coin in filteredCoins" :key="coin.id">
        <router-link
          :to="`${coin.id}`"
          style="text-decoration:none; color: inherit;"
        >
          <div class="coin">
            <p class="coin-rank">{{ coin.market_cap_rank }}</p>
            <img :src="coin.image" class="coin-image" />
            <p class="coin-name">{{ coin.id }}</p>
            <p class="current-price">
              <strong>£{{ coin.current_price.toFixed(2) }}</strong>
            </p>
            <p
              class="lessThan0"
              id="percentage"
              v-bind:class="{ greaterThan0: coin.greaterThan0 }"
            >
              {{ coin.price_change_percentage_24h.toFixed(2) }}%
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinList } from '../api';
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
    getCoinList().then((coins) => {
      console.log(coins);
      this.coins = this.formattCoinData(coins);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.coin-list-container {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.coin-list {
  width: 95%;
}

.coin:hover {
  background: lightslategray;
  transition: 0.5s ease;
  cursor: pointer;
}

.coin {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0.6em;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 1.4em;
}

.coin-rank {
  margin: 1em 2em;
  min-width: 15%;
}

.coin-image {
  width: 3em;
  height: 3em;
  margin: 0.2em;
}
.coin-name {
  padding-right: 2em;
  margin: 1em 2em;
  min-width: 15%;
}

.current-price {
  margin: 1em 2em;
  min-width: 15%;
}

#percentage {
  margin: 1em 2em;
  min-width: 15%;
}

@media screen and (max-width: 950px) {
  .coin-container {
    font-size: 0.9em;
  }

  .coin-list-container {
    width: 100%;
  }

  .coin-list {
    width: 100%;
    justify-content: center;
  }

  .coin p {
    min-width: 5%;
  }
}

@media screen and (max-width: 600px) {
  .coin-container {
    font-size: 0.6em;
  }
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
