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
import vuemoment from 'vue-moment';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { Lazyload } from 'vant';
import vueHeadful from 'vue-headful';

const moment = require('moment');
import 'moment/locale/zh-cn';
Vue.use(vuemoment, {moment});

Vue.component('vue-headful', vueHeadful);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vant);
Vue.use(Lazyload);
Vue.component(VueQrcode.name, VueQrcode);
Vue.prototype.$api = api;
Vue.prototype.$_ = _;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');