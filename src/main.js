import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant';
import App from './components/App.vue';
import 'vant/lib/index.css';
import 'animate.css';
import './assets/css/main.css';
import router from './router';
import api from './api';
import store from './store/';
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

Vue.filter('profile_display_name', function (value) {
  return value.user.full_name || value.nickname || value.user.username;
});

Vue.filter('user_display_name', function (value) {
  return value.full_name || value.kehubu_profile.nickname || value.username;
});

Vue.filter('gender', function (value) {
  if (value === "m") {
    return "男";
  } else if (value === "f") {
    return "女";
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');