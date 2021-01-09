<template>
  <div id="app">
    <cryptoicon symbol="btc" size="100" color="black" />
    <h1>
      Crypto-Vue
    </h1>
    <CoinsList />
    <router-view />
  </div>
</template>

<script>
import CoinsList from '../components/CoinsList';

export default {
  name: 'App',
  components: {
    CoinsList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
