import api from '@/api';

const state = {
  groupList: [],
  currentGroup: null,
};

const getters = {
  isCurrentGroupCreator(state, getters, rootState) {
    if (rootState.profile.profile.user.id === state.currentGroup.creator.id) {
      return true;
    } else {
      return false;
    }
  },
};

const mutations = {
  setGroupList(state, groupList) {
    state.groupList = groupList;
  },
  setCurrentGroup(state, group) {
    state.currentGroup = group;
  },
};

const actions = {
  getGroupList ({commit}) {
    var params = {creator: state.profile.profile.user.id, limit: 1000};
    return api.kehubu.getGroupList({params: params}).then( res => {
      commit("setGroupList", res.data.results);
    });
  },
  getGroup({commit}, id) {
    return api.kehubu.getGroup(id).then( res => {
      commit("setCurrentGroup", res.data);
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