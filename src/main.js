import Vue from 'vue';
import App from './App.vue';
import Cryptoicon from 'vue-cryptoicon';
import icon from 'vue-cryptoicon/src/icons';
import router from './router';
import ChartKick from 'vue-chartkick';
import Chart from 'chart.js';

Cryptoicon.add(icon);
Vue.use(Cryptoicon);
Vue.use(ChartKick.use(Chart));

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
