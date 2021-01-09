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
      </li>
    </ul>
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
.coin-container .coin-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.coin-list li {
  width: 80%;
}
.coin:hover {
  background: lightslategray;
  transition: 0.5s ease;
  cursor: pointer;
}

.coin {
  display: flex;
  flex-direction: row;
  margin: 0.6em;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 1.4em;
}

.coin-rank {
  margin: 1em 2em;
}

.coin-image {
  width: 3em;
  height: 3em;
  margin: 0.2em;
}
.coin-name {
  padding-right: 2em;
  margin: 1em 2em;
  width: 7em;
}

.current-price {
  min-width: 4em;
  margin: 1em 2em;
}

#percentage {
  margin: 1em 2em;
}

@media screen and (max-width: 700px) {
  .coin-container {
    font-size: 0.6em;
  }

  .coin-list li {
    width: 100%;
    margin-right: 25%;
  }

  .coin {
    width: 100%;
  }

  .coin-image {
    height: 3em;
    width: 3em;
  }
  .coin p {
    margin: 1em;
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
