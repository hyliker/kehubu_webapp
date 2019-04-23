/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: null,
    groupList: [],
    isTabBar: false,
    currentGroup: null,
    newGroupChat: null,
    newUserChat: null,
  },
  mutations: {
    updateNewGroupChat(state, chat) {
      if (chat.group === state.currentGroup.id) {
        state.newGroupChat = chat;
      } else {
        console.debug("ignore this chat:", chat);
      }
    },
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
    },
    updateCurrentGroup(state, group) {
      state.currentGroup = group;
    },
    updateNewUserChat(state, chat) {
      state.newUserChat = chat;
    },
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