import api from '@/api';

const state = {
  profile: null,
};

const getters = {};

const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};

const actions = {
  getProfile ({commit}) {
    return api.kehubu.getProfile('me').then(res => {
      commit('setProfile', res.data);
    });
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
