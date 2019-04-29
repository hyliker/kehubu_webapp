const state = {
  isTabBar: false,
};

const getters = {};

const mutations = {
  showTabBar(state) {
    state.isTabBar = true;
  },
  hideTabBar(state) {
    state.isTabBar = false;
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
};