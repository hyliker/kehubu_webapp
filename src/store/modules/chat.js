import api from '@/api';

const state = {
  newGroupChat: null,
  newUserChat: null,
};

const getters = {
};

const mutations = {
  setNewGroupChat(state, chat) {
    state.newGroupChat = chat;
  },
  setNewUserChat(state, chat) {
    state.newUserChat = chat;
  },
};

const actions = {
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}