import api from '@/api';

const state = {
  currentCategory: null,
  currentTopic: null,
};

const getters = {
  isCurrentTopicCreator(state, getters, rootState) {
    if (rootState.profile.profile.user.id === state.currentTopic.creator.id) {
      return true;
    } else {
      return false;
    }
  },
};

const mutations = {
  setCurrentCategory(state, category) {
    state.currentCategory = category;
  },
  setCurrentTopic(state, topic) {
    state.currentTopic = topic;
  }
};

const actions = {
  getCategory({commit}, id) {
    api.forum.getCategory(id).then( res => {
      commit("setCurrentCategory", res.data);
    });
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}