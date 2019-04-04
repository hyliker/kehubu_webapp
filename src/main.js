import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant';
import App from './App.vue';
import 'vant/lib/index.css';
import './assets/css/main.css';
import router from './router';
import api from './api';
import store from './store';
import _ from 'underscore';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vant)
Vue.prototype.$api = api
Vue.prototype.$_ = _;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')