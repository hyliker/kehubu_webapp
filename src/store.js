import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: null,
    groupList: [],
    isTabBar: false,
  },
  mutations: {
    updateProfile(state, profile) {
      state.profile = profile;
    },
    updateGroupList(state, groupList) {
      state.groupList = groupList;
    },
    showTabBar(state) {
      state.isTabBar = true;
    },
    hideTabBar(state) {
      state.isTabBar = false;
    }
  },
  actions: {
    getProfile ({commit}) {
      return api.kehubu.getProfile('me').then(res => {
        commit('updateProfile', res.data);
      });
    },
    getGroupList ({commit, state}) {
      var params = {creator: state.profile.user.id, limit: 1000};
      return api.kehubu.getGroupList({params: params}).then( res => {
        commit("updateGroupList", res.data.results);
      });
    }
  }
});