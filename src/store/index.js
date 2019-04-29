/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';
import forum from './modules/forum';
import group from './modules/group';
import profile from './modules/profile';
import ui from './modules/ui';
import chat from './modules/chat';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    group,
    forum,
    profile,
    ui,
  }
});